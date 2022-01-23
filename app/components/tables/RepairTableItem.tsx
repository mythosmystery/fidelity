import React from 'react';
import { Link, useNavigate } from 'remix';
import { RepairType } from '../../routes/repairs/list';

interface RepairTableProps {
   repair: RepairType;
}

export const RepairTableItem: React.FC<RepairTableProps> = ({ repair }) => {
   const navigate = useNavigate();
   return (
      <tr
         className='border-b border-t border-gray-600/50  hover:bg-gray-800 hover:cursor-pointer'
         onClick={() => navigate(`/repairs/${repair.id}`)}
      >
         <td className='p-2'>{repair.status}</td>
         <td className='p-2'>
            <Link to={`/users/${repair.intakeBy.id}`}>{repair.intakeBy.name}</Link>
         </td>
         <td className='p-2'>{repair.product.make}</td>
         <td className='p-2'>{repair.product.model}</td>
         <td className='p-2'>{repair.product.type}</td>
         <td className='p-2'>{repair.location || 'N/A'}</td>
         <td className='p-2'>
            <Link to={`/customers/${repair.customerId}`}>{repair.customer.name}</Link>
         </td>
         <td className='p-2'>{repair.customer.phoneNumber}</td>
      </tr>
   );
};
