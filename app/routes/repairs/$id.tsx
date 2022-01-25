import { ActionFunction, Link, LoaderFunction, Outlet, useLoaderData, useNavigate } from 'remix';
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
   console.log(params.id);
   console.log('hi');
   return null;
};

export default function Repair() {
   const data = useLoaderData<RepairType>();
   const navigate = useNavigate();
   return (
      <div className='flex flex-col text-white  w-full'>
         <div className='bg-red-400 p-3 flex justify-around'>
            {data.status}
            <button
               className='text-gray-200 hover:text-yellow-400'
               onClick={() => {
                  fetch(`/repairs/${data.id}/delete`, { method: 'POST' }).then(() =>
                     window.location.assign('/repairs/list')
                  );
               }}
            >
               Delete
            </button>
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
         <Outlet />
         {data.estimates?.map((estimate, i) => {
            return (
               <>
                  <div className='flex justify-around w-1/4'>
                     <h1 className='text-lg mt-4 ml-4'>Estimate {i + 1}</h1>
                     <button
                        className='text-red-500 hover:text-yellow-400'
                        onClick={() => {
                           fetch(`/repairs/${data.id}/${estimate.id}/delete`, { method: 'POST' }).then(() =>
                              navigate(`/repairs/${data.id}`, { replace: true })
                           );
                        }}
                     >
                        Delete
                     </button>
                  </div>
                  <form className='px-4 mx-3 mb-4 mt-2 flex flex-col' method='POST'>
                     <p>Status: {estimate.status}</p>
                     <input
                        className='bg-transparent my-2'
                        name='description'
                        type='text'
                        defaultValue={estimate.description}
                     />
                     <input className='bg-transparent my-2' name='price' type='text' defaultValue={estimate.price} />
                     <p>Prepared on {new Date(estimate.createdAt).toLocaleString()}</p>
                     <button type='submit' />
                  </form>
               </>
            );
         })}
         <Link className='text-lg text-blue-500 m-6' to={`/repairs/${data.id}/estimate/add`}>
            Add Estimate
         </Link>

         {/* <pre className='text-white'>{JSON.stringify(data, null, 3)}</pre> */}
      </div>
   );
}
