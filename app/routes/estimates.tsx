import { LoaderFunction, Outlet, useLoaderData } from 'remix';
import { RepairSidebar } from '../components/sidebar/RepairSidebar';
import { db } from '../utils/db.server';
import { requireUserId } from '../utils/session.server';

export const loader: LoaderFunction = async ({ request }) => {
   const userId = await requireUserId(request);
   const data = await db.repairOrder.findMany({
      where: {
         OR: [
            {
               userId
            },
            {
               techId: userId
            }
         ]
      },
      select: {
         id: true,
         product: {
            select: {
               make: true,
               model: true
            }
         }
      }
   });
   return data;
};

export default function Estimates() {
   const data = useLoaderData<
      {
         id: string;
         product: {
            make: string;
            model: string;
         };
      }[]
   >();
   return (
      <div className='flex'>
         <RepairSidebar data={data} />
         <Outlet />
      </div>
   );
}
