import { User } from '.prisma/client';
import React from 'react';
import { Link } from 'remix';

interface UserCardProps {
   user: User;
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
   return (
      <div>
         <img className='rounded-full w-16 h-16' src={user.picture} />
         <h1>{user.name}</h1>
         <p>{user.email}</p>
         <Link to={`/profile/${user.id}`}>{user.email}</Link>
      </div>
   );
};
