import { LoaderFunction } from '@remix-run/server-runtime';
import { useLoaderData } from 'remix';
import { Customer } from '../gen/graphql';
// import { sdk } from '../utils/gqlClient.server';

interface ILoader {
   data: Customer | null;
   err: any;
}

export const loader: LoaderFunction = async ({ params }): Promise<ILoader> => {
   try {
      // const { findCustomerByID } = await sdk.customerByID({ id: params.id as string });
      // if (findCustomerByID !== null && findCustomerByID !== undefined) {
      //    return { data: findCustomerByID, err: null };
      // }
   } catch (error: any) {
      return { err: error.response.errors, data: null };
   }
   return { err: null, data: null };
};

export default function CustomerPage() {
   const { data } = useLoaderData<ILoader>();
   return (
      <div>
         <h1>{data?.name}</h1>
         <p>{data?.phoneNumber}</p>
         <p>{data?.email}</p>
      </div>
   );
}
