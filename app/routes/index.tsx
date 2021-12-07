import { LoaderFunction } from 'remix';
import { useLoaderData } from 'remix';
import { Customer } from '../gen/graphql';
import { sdk } from '../utils/gqlClient.server';

interface ILoader {
   data: Customer[] | null;
   err: any;
}

export const loader: LoaderFunction = async (): Promise<ILoader> => {
   try {
      const { customers } = await sdk.getCustomers();
      if (customers.data !== null && customers.data !== undefined) {
         return { data: customers.data as Customer[], err: null };
      }
   } catch (error: any) {
      return { err: error.response.errors, data: null };
   }
   return { err: null, data: null };
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
   const { data, err } = useLoaderData<ILoader>();
   console.log(err);

   return (
      <main>
         <h1 className='text-green-600 text-6xl'> Index page</h1>
         {data?.map(cust => {
            return (
               <div key={cust._id}>
                  <p>{cust.name}</p>
                  <p>{cust.phoneNumber}</p>
               </div>
            );
         })}
      </main>
   );
}
