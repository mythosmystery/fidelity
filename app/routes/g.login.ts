import { ActionFunction } from '@remix-run/server-runtime';
import { GoogleLoginResponse } from 'react-google-login';
import { OAuth2Client } from 'google-auth-library';
import { web } from '../../google/client_secret_875138566928-r1d085gmj7cvfvlhv55vetse0mrpfis1.apps.googleusercontent.com.json';
import { db } from '../utils/db.server';
import { User } from '.prisma/client';
import { createUserSession } from '../utils/session.server';

const client = new OAuth2Client(web.client_id);

const googleAuth = async (token: string): Promise<string | null> => {
   const ticket = await client.verifyIdToken({
      idToken: token,
      audience: web.client_id
   });

   const payload = ticket.getPayload();

   let user: User | null;

   if (payload) {
      user = await db.user.findFirst({ where: { email: payload.email } });
      console.log(user);
      
      if (!user) {
         console.log('creating user');
         user = await db.user.create({
            data: {
               email: payload.email as string,
               name: payload.name as string,
               picture: payload.picture as string,
               sub: payload.sub
            }
         });
      }
      return user.id;
   }
   return null;
};

export const action: ActionFunction = async ({ request }) => {
   const data = JSON.parse(await request.text()) as GoogleLoginResponse;
   const userId = await googleAuth(data.tokenId);
   if (userId) {
      return createUserSession(userId, '/');
   }
   return null;
};
