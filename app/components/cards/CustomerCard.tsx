import { Customer } from '.prisma/client';
import React from 'react';
import { Link } from 'remix';

interface CustomerCardProps {
   customer: Customer;
   userName: string;
}

export const CustomerCard: React.FC<CustomerCardProps> = ({ customer, userName }) => {
   return (
      <Link to={`/customers/${customer.id}`}>
         <div className='rounded-md shadow-md py-4 px-10 m-4 text-white flex flex-col items-center border-2 hover:border-blue-400 border-gray-600'>
            <p className='hover:text-indigo-600 scale-110 my-2'>
               {customer.name} - {customer.email}
            </p>
            <p>{customer.phoneNumber}</p>
            <Link to={`/users/${customer.userId}`} className='hover:text-indigo-600 scale-110 my-2'>
               {userName}
            </Link>
         </div>
      </Link>
   );
};
