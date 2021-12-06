import { Customer } from '.prisma/client';
import { LoaderFunction } from '@remix-run/server-runtime';
import { useLoaderData } from 'remix';
import { db } from '../utils/db.server';

export const loader: LoaderFunction = async ({ params }): Promise<Customer | null> => {
   return await db.customer.findUnique({ where: { id: params.id } });
};
export default function CustomerPage() {
   const data = useLoaderData<Customer>();
   return (
      <div>
         <h1>{data?.name}</h1>
         <p>{data?.phoneNumber}</p>
      </div>
   );
}
