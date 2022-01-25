import { ActionFunction } from 'remix';
import { db } from '../../../utils/db.server';
import { requireAuth } from '../../../utils/session.server';

export const action: ActionFunction = async ({ params, request }) => {
   await requireAuth(request);
   await db.repairOrder.delete({ where: { id: params.id } });
   return null;
};
