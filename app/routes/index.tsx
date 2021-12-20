import { User } from '.prisma/client';
import { LoaderFunction } from 'remix';
import { useLoaderData } from 'remix';
import { UserCard } from '../components/cards/UserCard';
import { Heading } from '../components/view/Heading';
import { db } from '../utils/db.server';

export const loader: LoaderFunction = async ({}) => {
   const users = await db.user.findMany();
   return users;
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
   const users = useLoaderData<User[]>();

   return (
      <main>
         <Heading>Home Page</Heading>
         <div className='flex flex-col'>
            {users.map((user: User) => {
               return <UserCard user={user} key={user.id} />;
            })}
         </div>
      </main>
   );
}
