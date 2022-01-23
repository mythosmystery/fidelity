import { Customer, User } from '.prisma/client';
import { LoaderFunction, Outlet } from 'remix';
import { useLoaderData } from 'remix';
import { CustomerSidebar } from '../components/sidebar/CustomerSidebar';
import { db } from '../utils/db.server';
import { requireAuth } from '../utils/session.server';

export const loader: LoaderFunction = async ({ request }) => {
   await requireAuth(request);
   const data = await db.customer.findMany({ include: { enteredBy: true } });
   return data;
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
   let data = useLoaderData<Array<Customer & { enteredBy: User }>>();

   return (
      <main className='flex'>
         <CustomerSidebar customers={data} />
         <div className='px-8 py-4'>
            <Outlet />
         </div>
      </main>
   );
}
