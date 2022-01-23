import { Customer, User } from '@prisma/client';
import { LoaderFunction, useLoaderData } from 'remix';
import { CustomerCard } from '../../components/cards/CustomerCard';
import { UserCard } from '../../components/cards/UserCard';
import { Heading } from '../../components/view/Heading';
import { getCurrentUser } from '../../utils/session.server';

export const loader: LoaderFunction = async ({ request }) => {
   return await getCurrentUser(request);
};

export default function ProfilePage() {
   const data = useLoaderData<User & { customers: Customer[] }>();
   return (
      <div>
         <Heading>Hello, {data.name}</Heading>
         <UserCard user={data} />
         <div className='flex flex-col lg:flex-row'>
            {data.customers.map(customer => {
               return <CustomerCard customer={customer} userName={data.name} key={customer.id} />;
            })}
         </div>
      </div>
   );
}
