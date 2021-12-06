import { Customer } from '.prisma/client';
import { MetaFunction, LoaderFunction, Outlet } from 'remix';
import { useLoaderData, json, Link } from 'remix';
import { db } from '../utils/db.server';

export let loader: LoaderFunction = async (): Promise<{ name: string; id: string }[]> => {
   const data = await db.customer.findMany({ select: { name: true, id: true } });
   return data;
};

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = () => {
   return {
      title: 'Remix Starter',
      description: 'Welcome to remix!'
   };
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
   let data = useLoaderData<Customer[]>();

   return (
      <main>
         <h1 className='text-green-600 text-6xl'> Index page</h1>
         {data.map(cust => {
            return <p key={cust.id}>hello {cust.name}</p>;
         })}
      </main>
   );
}
