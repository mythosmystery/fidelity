import { ActionFunction, Link, LoaderFunction, redirect, useLoaderData } from 'remix';
import { db } from '../../utils/db.server';
import { RepairType } from '../../utils/types/types';

export const loader: LoaderFunction = async ({ params }) => {
   return await db.repairOrder.findUnique({
      where: {
         id: params.id
      },
      include: {
         customer: true,
         intakeBy: true,
         product: true,
         tech: true,
         estimates: {
            include: {
               invoice: true,
               preparedBy: true,
               parts: true
            }
         }
      }
   });
};

export const action: ActionFunction = async ({ params }) => {
   await db.repairOrder.delete({ where: { id: params.id } });

   return redirect('/repairs/list');
};

export default function Repair() {
   const data = useLoaderData<RepairType>();
   return (
      <div className='flex flex-col text-white  w-full'>
         <div className='bg-red-400 p-3 flex justify-around'>
            {data.status}
            <form method='POST'>
               <button type='submit' className='text-gray-200 hover:text-yellow-400'>
                  Delete
               </button>
            </form>
         </div>
         <div className='flex flex-col my-4'>
            <h1 className='ml-4 text-2xl'>
               {data.product.make} {data.product.model}
            </h1>
            <p className='ml-12 mt-2 mb-4'>{data.product.type}</p>
            <p className='my-4 mx-8 w-1/2'>{data.description}</p>
         </div>
         <h1 className='text-xl m-4'>Customer Details</h1>
         <Link to={`/customers/${data.customerId}`}>
            <div className='mx-6 p-2 hover:bg-gray-800 hover:cursor-pointer w-1/2'>
               <h2 className='text-lg'>{data.customer.name}</h2>
               <p>{data.customer.phoneNumber}</p>
               <p>{data.customer.email}</p>
            </div>
         </Link>
         <h1 className='text-xl mt-4 mx-4 mb-2'>Inktake By</h1>
         <Link to={`/users/${data.userId}`} className='text-lg px-8 hover:text-purple-500'>
            {data.intakeBy.name}
         </Link>
         <pre className='text-white'>{JSON.stringify(data, null, 3)}</pre>
      </div>
   );
}
