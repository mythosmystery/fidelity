import { LoaderFunction, Outlet, useLoaderData } from 'remix';
import { db } from '../utils/db.server';

export const loader: LoaderFunction = async () => {
   return await db.repairOrder.findMany({ include: { product: true, customer: true, intakeBy: true } });
};

export default function Repairs() {
   const data = useLoaderData();
   return (
      <div className='my-4'>
         <pre className='text-white'>{JSON.stringify(data, null, 2)}</pre>
         <Outlet />
      </div>
   );
}
