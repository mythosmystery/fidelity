import { Customer } from '.prisma/client';
import { LoaderFunction, Outlet } from 'remix';
import { useLoaderData, Link } from 'remix';
import { db } from '../utils/db.server';

export let loader: LoaderFunction = async (): Promise<Customer[]> => {
   return await db.customer.findMany();
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
   let data = useLoaderData<Customer[]>();

   return (
      <main>
         <h1 className='text-green-600 text-6xl'> Customers page</h1>
         {data.map(cust => {
            return (
               <div key={cust.id}>
                  <Link to={`/customers/${cust.id}`}>{cust.name}</Link>
               </div>
            );
         })}
         <Outlet />
      </main>
   );
}
