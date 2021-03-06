import { Customer, User } from '.prisma/client';
import { LoaderFunction } from '@remix-run/server-runtime';
import { Link, useLoaderData } from 'remix';
import { CustomerCard } from '../../../components/cards/CustomerCard';
import { RepairTable } from '../../../components/tables/RepairTable';
import { RepairTableItem } from '../../../components/tables/RepairTableItem';
import { Heading } from '../../../components/view/Heading';
import { db } from '../../../utils/db.server';
import { RepairType } from '../../../utils/types/types';

export const loader: LoaderFunction = async ({ params }) => {
   return await db.customer.findUnique({
      where: { id: params.id },
      include: {
         enteredBy: true,
         repairOrders: { include: { intakeBy: true, customer: true, product: true, tech: true } }
      }
   });
};

export default function CustomerPage() {
   const data = useLoaderData<Customer & { enteredBy: User; repairOrders: RepairType[] }>();
   return (
      <>
         <Heading>Customer Details</Heading>

         <div className='flex justify-evenly'>
            <CustomerCard customer={data} userName={data.enteredBy.name} />
         </div>
         {data.repairOrders.length ? (
            <div className='w-full text-center'>
               <RepairTable>
                  {data.repairOrders?.map(repair => {
                     return <RepairTableItem repair={repair} key={repair.id} />;
                  })}
               </RepairTable>
               <Link className='text-xl text-blue-400 hover:text-yellow-300 my-4' to={`/customers/${data.id}/add`}>
                  Add Repair
               </Link>
            </div>
         ) : (
            <Link className='text-xl text-blue-400 hover:text-yellow-300' to={`/customers/${data.id}/add`}>
               Add New Repair Order
            </Link>
         )}
      </>
   );
}
