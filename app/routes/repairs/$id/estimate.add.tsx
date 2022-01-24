import { ActionFunction, redirect } from 'remix';
import { db } from '../../../utils/db.server';
import { requireUserId } from '../../../utils/session.server';

export const action: ActionFunction = async ({ request, params }) => {
   const formData = await request.formData();
   const description = formData.get('description') as string;
   const price = formData.get('price') as string;
   const userId = await requireUserId(request);
   await db.estimate.create({
      data: {
         description,
         price,
         repairOrderId: params.id!,
         userId
      }
   });
   return redirect(`/repairs/${params.id}`);
};

export default function add() {
   return (
      <form method='POST' className='text-black flex flex-col lg:w-1/4'>
         <textarea name='description' required placeholder='estimate description' />
         <input type='text' required name='price' placeholder='price' />
         <button
            type='submit'
            className='bg-blue-400 shadow-md p-3 text-gray-900 w-16 text-center hover:bg-green-600 rounded-lg hover:text-indigo-700'
         >
            Add
         </button>
      </form>
   );
}
