import { ActionFunction } from '@remix-run/server-runtime';
import { useActionData } from 'remix';
import { db } from '../../utils/db.server';
import { requireUserId } from '../../utils/session.server';

type ErrorsType = Array<{ message: string; extensions: any }> | null;

export const action: ActionFunction = async ({ request }): Promise<ErrorsType> => {
   const formData = await request.formData();
   const userId = await requireUserId(request);

   const name = formData.get('name') as string;
   const phoneNumber = formData.get('phoneNumber') as string;
   const email = formData.get('email') as string;

   try {
      await db.customer.create({ data: { email, name, phoneNumber, userId } });
   } catch (err: any) {
      return err;
   }
   return null;
};

export default function Add() {
   const error = useActionData<ErrorsType>();
   console.log(error);
   return (
      <form method='POST'>
         <div className='flex flex-col w-[25rem] mx-auto gap-y-3 bg-gray-500 rounded-md p-6 shadow-md items-center text-center'>
            <input type='text' required minLength={2} name='name' placeholder='name' className='flex-grow p-1' />
            <input
               type='text'
               required
               minLength={10}
               name='phoneNumber'
               placeholder='phone number'
               className='flex-grow p-1'
            />
            <input type='text' required minLength={11} name='email' placeholder='email' className='flex-grow p-1' />
            <button
               type='submit'
               className='bg-blue-400 shadow-md p-3 text-gray-900 w-16 text-center hover:bg-green-600 rounded-lg hover:text-indigo-700'
            >
               Add
            </button>
            {error ? <p className='text-yellow-200'>Email already taken</p> : null}
         </div>
      </form>
   );
}
