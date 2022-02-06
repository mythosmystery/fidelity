import { ActionFunction, Form, Link, LoaderFunction, Outlet, useLoaderData, useSubmit } from 'remix';
import { CustomerCard } from '../../components/cards/CustomerCard';
import { EstimateCard } from '../../components/cards/EstimateCard';
import { Dropdown } from '../../components/utils/Dropdown';
import { EditField } from '../../components/view/EditField';
import { STATUSES } from '../../utils/constants';
import { db } from '../../utils/db.server';
import { RepairType } from '../../utils/types/types';

export const loader: LoaderFunction = async ({ params }) => {
   return await db.repairOrder.findUnique({
      where: {
         id: params.id
      },
      include: {
         customer: {
            include: {
               enteredBy: true
            }
         },
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

export const action: ActionFunction = async ({ request, params }) => {
   const formData = await request.formData();

   const problemDescription = formData.get('problemDescription') as string | null;
   const repairStatus = formData.get('repairStatus') as string | null;

   const estStatus = formData.get('estimateStatus') as string;
   const description = formData.get('description') as string;
   const price = formData.get('price') as string;
   const id = formData.get('id') as string;
   if (problemDescription || repairStatus) {
      await db.repairOrder.update({
         where: {
            id: params.id
         },
         data: {
            description: problemDescription ?? undefined,
            status: repairStatus ?? undefined
         }
      });
   } else {
      await db.estimate.update({
         where: { id },
         data: {
            description,
            price,
            status: estStatus
         }
      });
   }

   return null;
};

export default function Repair() {
   const data = useLoaderData<RepairType>();
   const submit = useSubmit();
   return (
      <div className='flex flex-col text-white w-full'>
         <div className='bg-red-400 p-3 flex justify-around'>
            <Form
               method='post'
               onChange={e => {
                  submit(e.currentTarget, { replace: true });
               }}
            >
               <Dropdown options={STATUSES} name='repairStatus' currentOption={data.status} />
            </Form>
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
         <div className='w-full md:w-1/2 lg:w-1/3 mx-12'>
            <div className='flex flex-col my-4'>
               <form method='post'>
                  <h1 className='ml-4 text-2xl'>
                     {data.product.make} {data.product.model}
                  </h1>
                  <p className='ml-12 mt-2 mb-4'>{data.product.type}</p>
                  <EditField type='text' name='problemDescription' defaultValue={data.description} />
                  <button type='submit' />
               </form>
            </div>
            <h1 className='text-xl m-4'>Customer Details</h1>
            <CustomerCard customer={data.customer} userName={data.customer.enteredBy.name} />
            <h1 className='text-xl mt-4 mx-4 mb-2'>Inktake By</h1>
            <Link to={`/users/${data.userId}`} className='text-lg px-8 hover:text-purple-500'>
               {data.intakeBy.name}
            </Link>
            {/* <p>{JSON.stringify(data.estimates, null, 2)}</p> */}
            {data.estimates?.map((e, i) => {
               return data.id === e.repairOrderId ? <EstimateCard estimate={e} index={i} id={data.id} key={i} /> : null;
            })}
            <Outlet />
            <Link className='text-lg text-blue-500 m-6' to={`/repairs/${data.id}/estimate/add`}>
               Add Estimate
            </Link>
         </div>
      </div>
   );
}
