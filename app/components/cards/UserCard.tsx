import { User } from '.prisma/client';
import React from 'react';
import { Link } from 'remix';

interface UserCardProps {
   user: User;
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
   return (
      <div className='bg-gray-700 rounded-md shadow-md p-4 m-4 w-1/4 flex flex-col items-center hover:border-2 border-blue-400'>
         <img className='rounded-full w-16 h-16 mb-4' src={user.picture} />
         <h1>{user.name}</h1>
         <Link className='hover:text-indigo-600' to={`/users/${user.id}`}>
            {user.email}
         </Link>
      </div>
   );
};
