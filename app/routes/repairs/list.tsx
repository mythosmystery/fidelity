import { RepairOrder, Customer, User, Product } from '@prisma/client';
import { LoaderFunction, useLoaderData } from 'remix';
import { RepairTable } from '../../components/tables/RepairTable';
import { RepairTableItem } from '../../components/tables/RepairTableItem';
import { db } from '../../utils/db.server';

export type RepairType = RepairOrder & {
   customer: Customer;
   intakeBy: User;
   product: Product;
   tech: User | null;
};

export const loader: LoaderFunction = async ({}) => {
   const data = await db.repairOrder.findMany({
      include: {
         customer: true,
         intakeBy: true,
         product: true,
         tech: true
      }
   });
   return data;
};

export default function List() {
   const data = useLoaderData<RepairType[]>();
   return (
      <RepairTable>
         {data.map(repair => {
            return <RepairTableItem key={repair.id} repair={repair} />;
         })}
      </RepairTable>
   );
}
