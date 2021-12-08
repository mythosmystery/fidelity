import { ApolloQueryResult } from '@apollo/client';
import { LoaderFunction } from 'remix';
import { useLoaderData } from 'remix';
import { GetCustomersDocument, GetCustomersQuery } from '../gen/graphql';
import { client } from '../utils/apolloClient.server';

export const loader: LoaderFunction = async () => {
   const data = await client.query<GetCustomersQuery>({ query: GetCustomersDocument });
   return data;
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
   const { data, error } = useLoaderData<ApolloQueryResult<GetCustomersQuery>>();
   if (error) {
      console.log(error);
      return null;
   }
   return (
      <main>
         <h1 className='text-green-600 text-6xl'> Index page</h1>
         <div className='flex flex-col'>
            {data?.customers.data.map(cust => {
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
