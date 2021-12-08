import { ApolloQueryResult } from '@apollo/client';
import { LoaderFunction } from '@remix-run/server-runtime';
import { useLoaderData } from 'remix';
import { Customer, CustomerByIdDocument, CustomerByIdQuery } from '../gen/graphql';
import { client } from '../utils/apolloClient.server';

export const loader: LoaderFunction = async ({ params }) => {
   return await client.query({ query: CustomerByIdDocument, variables: { id: params.id || '' } });
};

export default function CustomerPage() {
   const {
      data: { findCustomerByID: data }
   } = useLoaderData<ApolloQueryResult<CustomerByIdQuery>>();
   return (
      <div>
         <h1>{data?.name}</h1>
         <p>{data?.phoneNumber}</p>
         <p>{data?.email}</p>
      </div>
   );
}
