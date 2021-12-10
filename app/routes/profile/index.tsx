import { User } from '@prisma/client';
import { LoaderFunction, useLoaderData } from 'remix';
import { getCurrentUser } from '../../utils/session.server';

export const loader: LoaderFunction = async ({ request }) => {
   return await getCurrentUser(request);
};

export default function ProfilePage() {
   const data = useLoaderData<User>();
   return <h1>hello, {data.name}</h1>;
}
