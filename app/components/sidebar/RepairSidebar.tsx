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
      <div className='border-r border-gray-600/50 flex flex-col'>
         <div className='border-b py-2.5 px-3 text-lg text-gray-400 border-gray-600/50 hover:bg-gray-500 hover:text-gray-800'>
            <Link to='/repairs/add'>New Repair</Link>
         </div>
         {data.map(({ id, product }) => {
            return (
               <div className='border-b py-2.5 px-3 text-lg text-gray-400 border-gray-600/50 hover:bg-gray-500 hover:text-gray-800'>
                  <Link to={`/repairs/${id}`} key={id}>
                     {product.make} {product.model}
                  </Link>
               </div>
            );
         })}
      </div>
   );
};
