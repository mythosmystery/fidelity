import { Customer, User } from '.prisma/client';
import { LoaderFunction, Outlet } from 'remix';
import { useLoaderData, Link } from 'remix';
import { db } from '../utils/db.server';

export const loader: LoaderFunction = async ({}) => {
   const data = await db.customer.findMany({ include: { enteredBy: true } });
   return data;
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
   let data = useLoaderData<Array<Customer & { enteredBy: User }>>();

   return (
      <main className='px-8 py-4'>
         <h1 className='text-green-600 text-6xl'> Customers page</h1>
         <div className='px-8 my-4'>
            {data.map(cust => {
               return (
                  <div key={cust.id}>
                     <Link to={`/customers/${cust.id}`} className='hover:text-indigo-600 scale-110'>
                        {cust.name} - {cust.email}
                     </Link>
                     <p>{cust.phoneNumber}</p>
                     <Link to={`/users/${cust.userId}`}>{cust.enteredBy.name}</Link>
                  </div>
               );
            })}
         </div>
         <Outlet />
      </main>
   );
}
