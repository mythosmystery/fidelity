import { Customer, User } from '.prisma/client';
import { LoaderFunction } from '@remix-run/server-runtime';
import { useLoaderData } from 'remix';
import { CustomerCard } from '../../components/cards/CustomerCard';
import { UserCard } from '../../components/cards/UserCard';
import { db } from '../../utils/db.server';

export const loader: LoaderFunction = async ({ params }) => {
   return db.user.findUnique({ where: { id: params.id }, include: { customers: true } });
};

export default function UserPage() {
   const data = useLoaderData<User & { customers: Customer[] }>();
   return (
      <div>
         <UserCard user={data} />
         <div className='flex'>
            {data.customers.map(cust => {
               return <CustomerCard customer={cust} userName={data.name} key={cust.id} />;
            })}
         </div>
      </div>
   );
}
