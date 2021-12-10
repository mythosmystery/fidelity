import { Customer, User } from '.prisma/client';
import { LoaderFunction } from '@remix-run/server-runtime';
import { useLoaderData } from 'remix';
import { db } from '../utils/db.server';

export const loader: LoaderFunction = async ({ params }) => {
   return await db.customer.findUnique({ where: { id: params.id }, include: { enteredBy: true } });
};

export default function CustomerPage() {
   const data = useLoaderData<Customer & { enteredBy: User }>();
   return (
      <div>
         <h1>{data.name}</h1>
         <p>{data.phoneNumber}</p>
         <p>{data.email}</p>
         <p>{data.enteredBy.name}</p>
      </div>
   );
}
