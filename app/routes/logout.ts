import { ActionFunction } from '@remix-run/server-runtime';
import { logout } from '../utils/session.server';

export const action: ActionFunction = async ({ request }) => {
   return logout(request);
};
