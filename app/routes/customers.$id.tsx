import { LoaderFunction } from '@remix-run/server-runtime';
import { useLoaderData } from 'remix';
import { CustomerByIdQuery } from '../gen/graphql';
import { sdk } from '../utils/gqlClient.server';

export const loader: LoaderFunction = async ({ params }) => {
   return await sdk.customerByID({ id: params.id || '' });
};

export default function CustomerPage() {
   const { findCustomerByID: data } = useLoaderData<CustomerByIdQuery>();
   return (
      <div>
         <h1>{data?.name}</h1>
         <p>{data?.phoneNumber}</p>
         <p>{data?.email}</p>
      </div>
   );
}
