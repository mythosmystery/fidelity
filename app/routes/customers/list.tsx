import { Customer, User } from '@prisma/client';
import { LoaderFunction, useLoaderData } from 'remix';
import { CustomerCard } from '../../components/cards/CustomerCard';
import { Heading } from '../../components/view/Heading';
import { db } from '../../utils/db.server';

export const loader: LoaderFunction = async ({}) => {
   const data = await db.customer.findMany({ include: { enteredBy: true } });
   return data;
};

export default function List() {
   const data = useLoaderData<Array<Customer & { enteredBy: User }>>();
   return (
      <>
         <Heading>All Customers</Heading>
         <div className='px-8 my-4 flex-grow'>
            {data.map(cust => {
               return <CustomerCard customer={cust} userName={cust.enteredBy.name} key={cust.id} />;
            })}
         </div>
      </>
   );
}
