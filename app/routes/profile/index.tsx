import { Customer, User } from '@prisma/client';
import { LoaderFunction, useLoaderData } from 'remix';
import { CustomerCard } from '../../components/CustomerCard';
import { UserCard } from '../../components/UserCard';
import { getCurrentUser } from '../../utils/session.server';

export const loader: LoaderFunction = async ({ request }) => {
   return await getCurrentUser(request);
};

export default function ProfilePage() {
   const data = useLoaderData<User & { customers: Customer[] }>();
   return (
      <div>
         <h1>hello, {data.name}</h1>
         <UserCard user={data} />
         <div className='flex'>
            {data.customers.map(customer => {
               return <CustomerCard customer={customer} userName={data.name} key={customer.id} />;
            })}
         </div>
      </div>
   );
}
