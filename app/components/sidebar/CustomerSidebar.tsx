import { Customer, User } from '@prisma/client';
import React from 'react';
import { Link } from 'remix';

interface SidebarProps {
   customers: Array<Customer & { enteredBy: User }>;
}

export const CustomerSidebar: React.FC<SidebarProps> = ({ customers }) => {
   return (
      <div className='border-r h-screen border-gray-600/50 capitalize'>
         <Link to={`/customers/add`}>
            <div className='border-b py-2.5 px-3 text-lg text-gray-400 border-gray-600/50 hover:bg-gray-500 hover:text-gray-800'>
               Add Customer
            </div>
         </Link>
         {customers.map(cust => {
            return (
               <Link to={`/customers/${cust.id}`}>
                  <div
                     key={cust.id}
                     className='border-b py-2.5 px-3 text-lg text-gray-400 border-gray-600/50 hover:bg-gray-500 hover:text-gray-800'
                  >
                     {cust.name}
                  </div>
               </Link>
            );
         })}
      </div>
   );
};
