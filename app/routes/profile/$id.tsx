import { User } from '.prisma/client';
import { LoaderFunction, useLoaderData } from 'remix';
import { db } from '../../utils/db.server';

export const loader: LoaderFunction = async ({ params }) => {
   const user = await db.user.findUnique({ where: { id: params.id } });
   return user;
};

export default function ProfilePage() {
   const data = useLoaderData<User>();
   return <h1>hello, {data.name}</h1>;
}
