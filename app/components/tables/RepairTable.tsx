import React from 'react';

export const RepairTable: React.FC = ({ children }) => {
   return (
      <table className='w-full text-center text-gray-300'>
         <tr>
            <th>Status</th>
            <th>Intake By</th>
            <th>Product Make</th>
            <th>Product Model</th>
            <th>Product Type</th>
            <th>Location</th>
            <th>Customer Name</th>
            <th>Customer Number</th>
         </tr>
         {children}
      </table>
   );
};
