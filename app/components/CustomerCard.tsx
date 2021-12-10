import { Customer } from '.prisma/client';
import React from 'react';
import { Link } from 'remix';

interface CustomerCardProps {
   customer: Customer;
   userName: string;
}

export const CustomerCard: React.FC<CustomerCardProps> = ({ customer, userName }) => {
   return (
      <div>
         <Link to={`/customers/${customer.id}`} className='hover:text-indigo-600 scale-110'>
            {customer.name} - {customer.email}
         </Link>
         <p>{customer.phoneNumber}</p>
         <Link to={`/users/${customer.userId}`}>{userName}</Link>
      </div>
   );
};
