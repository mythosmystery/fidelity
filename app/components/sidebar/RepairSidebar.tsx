import React from 'react';
import { Link } from 'remix';

interface RepairSidebarProps {
   data: {
      id: string;
      product: {
         make: string;
         model: string;
      };
   }[];
}

export const RepairSidebar: React.FC<RepairSidebarProps> = ({ data }) => {
   return (
      <div className='border-r border-gray-600/50 flex flex-col capitalize'>
         <Link to='/repairs/add'>
            <div className='border-b py-2.5 px-3 text-lg text-gray-400 border-gray-600/50 hover:bg-gray-500 hover:text-gray-800'>
               New Repair
            </div>
         </Link>
         {data.map(({ id, product }) => {
            return (
               <Link to={`/repairs/${id}`} key={id} replace>
                  <div className='border-b py-2.5 px-3 text-lg text-gray-400 border-gray-600/50 hover:bg-gray-500 hover:text-gray-800'>
                     {product.make} {product.model}
                  </div>
               </Link>
            );
         })}
      </div>
   );
};
