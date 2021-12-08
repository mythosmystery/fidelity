import { LoaderFunction, Outlet } from 'remix';
import { useLoaderData, Link } from 'remix';
import { GetCustomersQuery } from '../gen/graphql';
import { sdk } from '../utils/gqlClient.server';

export const loader: LoaderFunction = async ({}) => {
   return await sdk.getCustomers();
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
   let {
      customers: { data }
   } = useLoaderData<GetCustomersQuery>();

   return (
      <main className='px-8 py-4'>
         <h1 className='text-green-600 text-6xl'> Customers page</h1>
         <div className='px-8 my-4'>
            {data.map(cust => {
               return (
                  <div key={cust?._id}>
                     <Link to={`/customers/${cust?._id}`} className='hover:text-indigo-600 scale-110'>
                        {cust?.name} - {cust?.email}
                     </Link>
                     <p>{cust?.phoneNumber}</p>
                  </div>
               );
            })}
         </div>
         <Outlet />
      </main>
   );
}
