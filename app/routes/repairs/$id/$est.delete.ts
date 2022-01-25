import { ActionFunction } from 'remix';
import { db } from '../../../utils/db.server';
import { requireAuth } from '../../../utils/session.server';

export const action: ActionFunction = async ({ request, params }) => {
   await requireAuth(request);
   await db.estimate.delete({ where: { id: params.est } });
   return null;
};
