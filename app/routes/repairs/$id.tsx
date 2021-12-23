import { LoaderFunction, useLoaderData } from 'remix';
import { db } from '../../utils/db.server';

export const loader: LoaderFunction = async ({ params }) => {
   return await db.repairOrder.findUnique({
      where: {
         id: params.id
      },
      include: {
         customer: true,
         intakeBy: true,
         product: true,
         tech: true
      }
   });
};

export default function Repair() {
   const data = useLoaderData();
   return <pre className='text-white'>{JSON.stringify(data, null, 3)}</pre>;
}
