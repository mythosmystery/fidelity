import { ActionFunction, redirect, useActionData } from 'remix';
import { db } from '../../../utils/db.server';
import { requireUserId } from '../../../utils/session.server';

export const action: ActionFunction = async ({ request, params }) => {
   const formData = await request.formData();
   const description = formData.get('description') as string;
   const make = formData.get('make') as string;
   const model = formData.get('model') as string;
   const type = formData.get('type') as string;
   const userId = await requireUserId(request);

   await db.product.upsert({
      where: {
         model
      },
      create: {
         make,
         model,
         type,
         repairOrders: {
            create: {
               customerId: params.id!,
               userId,
               description
            }
         }
      },
      update: {
         repairOrders: {
            create: {
               customerId: params.id!,
               userId,
               description
            }
         }
      }
   });
   return redirect(`/customers/${params.id}`);
};

export default function addRepair() {
   const error = useActionData();
   return (
      <form method='POST'>
         <div className='flex flex-col w-[25rem] mx-auto gap-y-3 bg-gray-500 rounded-md p-6 shadow-md items-center text-center'>
            <textarea
               required
               minLength={2}
               name='description'
               placeholder='problem description'
               className='flex-grow p-1'
            />
            <input type='text' required minLength={1} name='make' placeholder='make' className='flex-grow p-1' />
            <input type='text' required minLength={1} name='model' placeholder='model' className='flex-grow p-1' />
            <input type='text' required minLength={1} name='type' placeholder='type' className='flex-grow p-1' />
            <button
               type='submit'
               className='bg-blue-400 shadow-md p-3 text-gray-900 w-16 text-center hover:bg-green-600 rounded-lg hover:text-indigo-700'
            >
               Add
            </button>
            {error ? <p className='text-yellow-200'>Error</p> : null}
         </div>
      </form>
   );
}
