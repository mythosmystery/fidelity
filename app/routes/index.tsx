import { User } from '.prisma/client';
import { Link, LoaderFunction } from 'remix';
import { useLoaderData } from 'remix';
import { GLogout } from '../components/GLogout';
import { UserCard } from '../components/UserCard';
import { db } from '../utils/db.server';
import { isSignedIn } from '../utils/session.server';

export const loader: LoaderFunction = async ({ request }) => {
   const users = await db.user.findMany();
   return { users, isSignedIn: await isSignedIn(request) };
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
   const { users, isSignedIn } = useLoaderData<{ users: User[]; isSignedIn: boolean }>();

   return (
      <main>
         <h1 className='text-green-600 text-6xl'> Index page</h1>
         <div className='flex flex-col'>
            {isSignedIn ? <GLogout /> : <Link to='/login'>Login</Link>}
            {users.map((user: User) => {
               return <UserCard user={user} key={user.id} />;
            })}
         </div>
      </main>
   );
}
