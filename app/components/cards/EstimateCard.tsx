import React from 'react';
import { useNavigate } from 'remix';
import { EST_STATUSES } from '../../utils/constants';
import { EstimateType } from '../../utils/types/types';
import { Dropdown } from '../utils/Dropdown';
import { EditField } from '../view/EditField';

interface EstimateCardProps {
   estimate: EstimateType;
   id: string;
   index: number;
}

export const EstimateCard: React.FC<EstimateCardProps> = ({ estimate, id, index }) => {
   const navigate = useNavigate();
   const createdAtPretty = new Date(estimate.createdAt).toLocaleString();
   const updatedAtPretty = new Date(estimate.updatedAt).toLocaleString();
   return (
      <div className='my-6 hover:bg-gray-700 hover:border-2 p-2 border-blue-400'>
         <div className='flex justify-around align-center mb-1.5'>
            <h1 className='text-lg ml-4'>Estimate {index + 1}</h1>
            <button
               className='text-red-500 hover:text-yellow-400'
               onClick={() => {
                  fetch(`/repairs/${id}/${estimate.id}/delete`, { method: 'POST' }).then(() =>
                     navigate(`/repairs/${id}`, { replace: true })
                  );
               }}
            >
               Delete
            </button>
         </div>
         <form method='post'>
            <div className='px-4 mx-3 mb-4 mt-2 flex flex-col'>
               <Dropdown options={EST_STATUSES} name='estimateStatus' currentOption={estimate.status} />
               <EditField name='description' type='text' defaultValue={estimate.description} />
               <EditField name='price' type='text' defaultValue={estimate.price} />
               {updatedAtPretty == createdAtPretty ? (
                  <p>Prepared on {createdAtPretty}</p>
               ) : (
                  <>
                     <p>Prepared on {createdAtPretty}</p>
                     <p>Updated on {updatedAtPretty}</p>
                  </>
               )}
               <input type='text' className='hidden' name='id' value={estimate.id} readOnly />
               <button type='submit' />
            </div>
         </form>
      </div>
   );
};
