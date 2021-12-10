import { Customer, User } from '.prisma/client';
import { LoaderFunction } from '@remix-run/server-runtime';
import { useLoaderData } from 'remix';
import { db } from '../../utils/db.server';

export const loader: LoaderFunction = async ({ params }) => {
   return db.user.findUnique({ where: { id: params.id }, include: { customers: true } });
};

export default function UserPage() {
   const data = useLoaderData<User & { customers: Customer[] }>();
   return (
      <div>
         <h1>{data.name}</h1>
         <p>{data.email}</p>
         <img className='rounded-full w-16 h-16' src={data.picture} />
         <div className='flex'>
            {data.customers.map(cust => {
               return (
                  <div>
                     <h1>{cust.name}</h1>
                     <p>{cust.email}</p>
                     <p>{cust.phoneNumber}</p>
                  </div>
               );
            })}
         </div>
      </div>
   );
}
