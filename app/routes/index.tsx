import { LoaderFunction } from 'remix';
import { useLoaderData } from 'remix';
import { GetCustomersQuery } from '../gen/graphql';
import { sdk } from '../utils/gqlClient.server';

export const loader: LoaderFunction = async () => {
   return await sdk.getCustomers();
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
   const {
      customers: { data }
   } = useLoaderData<GetCustomersQuery>();

   return (
      <main>
         <h1 className='text-green-600 text-6xl'> Index page</h1>
         <div className='flex flex-col'>
            {data.map(cust => {
               return (
                  <div key={cust?._id}>
                     <h1>{cust?.name}</h1>
                  </div>
               );
            })}
         </div>
      </main>
   );
}
