import { ActionFunction, redirect } from '@remix-run/server-runtime';
import { db } from '../../utils/db.server';

export const action: ActionFunction = async ({ request }) => {
   const formData = await request.formData();
   const name = formData.get('name') as string;
   const phoneNumber = formData.get('phoneNumber') as string;
   try {
      await db.customer.create({
         data: {
            name,
            phoneNumber
         }
      });
   } catch (err) {
      console.log(err);
   }
   return null;
};

export default function Add() {
   return (
      <form method='POST'>
         <input type='text' name='name' />
         <input type='text' name='phoneNumber' />
         <button type='submit'>Add</button>
      </form>
   );
}
