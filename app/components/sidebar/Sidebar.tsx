import { Customer, User } from '@prisma/client';
import React from 'react';
import { Link } from 'remix';

interface SidebarProps {
   customers: Array<Customer & { enteredBy: User }>;
}

export const Sidebar: React.FC<SidebarProps> = ({ customers }) => {
   return (
      <div className='border-r h-screen border-gray-600/50'>
         {customers.map(cust => {
            return (
               <div
                  key={cust.id}
                  className='border-b py-2.5 px-3 text-lg text-gray-400 border-gray-600/50 hover:bg-gray-500 hover:text-gray-800'
               >
                  <Link to={`/customers/${cust.id}`}>{cust.name}</Link>
               </div>
            );
         })}
      </div>
   );
};
