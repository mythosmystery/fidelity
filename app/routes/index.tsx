import { User } from '.prisma/client';
import { LoaderFunction } from 'remix';
import { useLoaderData } from 'remix';
import { UserCard } from '../components/UserCard';
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
         <h1 className='text-green-600 text-6xl'> Index page</h1>
         <div className='flex flex-col'>
            {users.map((user: User) => {
               return <UserCard user={user} key={user.id} />;
            })}
         </div>
      </main>
   );
}
