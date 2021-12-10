import { createCookieSessionStorage, redirect } from '@remix-run/server-runtime';
import { db } from './db.server';

const sessionSecret = process.env.SESSION_SECRET || 'asdasdasdasdasdasd';

const storage = createCookieSessionStorage({
   cookie: {
      name: 'fidelity_session',
      secure: process.env.NODE_ENV === 'production',
      secrets: [sessionSecret],
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
      httpOnly: true
   }
});

export const createUserSession = async (userId: string, redirectTo: string) => {
   const session = await storage.getSession();
   session.set('userId', userId);
   return redirect(redirectTo, {
      headers: {
         'Set-Cookie': await storage.commitSession(session)
      }
   });
};

export const getUserSession = (request: Request) => {
   return storage.getSession(request.headers.get('Cookie'));
};

export const getUserId = async (request: Request) => {
   const session = await getUserSession(request);
   const userId = session.get('userId');
   if (!userId || typeof userId !== 'string') return null;
   return userId;
};

export const getCurrentUser = async (request: Request) => {
   const userId = await requireUserId(request);
   if (!userId) {
      return redirect('/login');
   }
   const user = await db.user.findUnique({ where: { id: userId } });
   return user;
};

export const isSignedIn = async (request: Request) => {
   const userId = await getUserId(request);
   return !!userId;
};

export const requireUserId = async (request: Request) => {
   const session = await getUserSession(request);
   const userId = session.get('userId');
   if (!userId || typeof userId !== 'string') {
      throw redirect(`/login`);
   }
   return userId;
};

export const logout = async (request: Request) => {
   const session = await getUserSession(request);
   return redirect('/', {
      headers: {
         'Set-Cookie': await storage.destroySession(session)
      }
   });
};
