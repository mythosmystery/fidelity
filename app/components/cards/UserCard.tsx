import { User } from '.prisma/client';
import React from 'react';
import { Link } from 'remix';

interface UserCardProps {
   user: User;
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
   return (
      <Link to={`/users/${user.id}`}>
         <div className='shadow-md p-4 m-4 lg:w-1/4 flex flex-col items-center hover:border-2 hover:bg-gray-700 border-blue-400 text-white'>
            <img className='rounded-full w-16 h-16 mb-4' src={user.picture} />
            <h1>{user.name}</h1>
            <p className='hover:text-indigo-600'>{user.email}</p>
         </div>
      </Link>
   );
};
