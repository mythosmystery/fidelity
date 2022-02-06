import { ActionFunction, redirect } from 'remix';
import { Field } from '../../components/view/Field';
import { db } from '../../utils/db.server';
import { requireUserId } from '../../utils/session.server';

export const action: ActionFunction = async ({ request }) => {
   const formData = await request.formData();
   const userId = await requireUserId(request);
   const name = formData.get('name') as string;
   const phoneNumber = formData.get('phoneNumber') as string;
   const email = formData.get('email') as string;
   await db.customer.upsert({
      where: {
         email
      },
      create: {
         email,
         name,
         phoneNumber,
         userId
      },
      update: {}
   });
   return redirect('/customers/list');
};

export default function add() {
   return (
      <form method='POST' className='flex flex-col gap-4 items-center text-center'>
         <Field type='text' name='name' placeholder='name' />
         <Field type='text' name='phoneNumber' placeholder='phone number' />
         <Field type='text' name='email' placeholder='email' />
         <button
            type='submit'
            className='bg-blue-400 shadow-md p-3 text-gray-900 w-16 text-center hover:bg-green-600 rounded-lg hover:text-indigo-700'
         >
            Add
         </button>
      </form>
   );
}
