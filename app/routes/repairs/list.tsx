import { RepairOrder, Customer, User, Product } from '@prisma/client';
import { LoaderFunction, useLoaderData } from 'remix';
import { RepairTable } from '../../components/tables/RepairTable';
import { db } from '../../utils/db.server';

export type RepairType = RepairOrder & {
   customer: Customer;
   intakeBy: User;
   product: Product;
   tech: User | null;
};

export const loader: LoaderFunction = async ({}) => {
   const data = await db.repairOrder.findMany({
      include: {
         customer: true,
         intakeBy: true,
         product: true,
         tech: true
      }
   });
   return data;
};

export default function List() {
   const data = useLoaderData<RepairType[]>();
   return (
      <table className='w-full text-center text-gray-300'>
         <tr>
            <th>Status</th>
            <th>Intake By</th>
            <th>Product Make</th>
            <th>Product Model</th>
            <th>Product Type</th>
            <th>Location</th>
            <th>Customer Name</th>
            <th>Customer Number</th>
         </tr>
         {data.map(repair => {
            return <RepairTable key={repair.id} repair={repair} />;
         })}
      </table>
   );
}
