import { LoaderFunction } from 'remix';
import { useLoaderData } from 'remix';
import { GetCustomers, GetCustomersQuery } from '../gen/graphql';
import { client } from '../utils/gqlClient.server';

export const loader: LoaderFunction = async (): Promise<any> => {
   return await client.request<GetCustomersQuery>(GetCustomers);
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
   const { customers } = useLoaderData<GetCustomersQuery>();

   return (
      <main>
         <h1 className='text-green-600 text-6xl'> Index page</h1>
         {customers.data?.map(cust => {
            return (
               <div key={cust?._id}>
                  <p>{cust?.name}</p>
                  <p>{cust?.phoneNumber}</p>
               </div>
            );
         })}
      </main>
   );
}
