import React from 'react';
import { useNavigate } from 'remix';
import { EstimateType } from '../../utils/types/types';

interface EstimateCardProps {
   estimate: EstimateType;
   id: string;
   index: number;
}

export const EstimateCard: React.FC<EstimateCardProps> = ({ estimate, id, index }) => {
   const navigate = useNavigate();
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
         <form className='px-4 mx-3 mb-4 mt-2 flex flex-col' method='POST'>
            <p>Status: {estimate.status}</p>
            <input className='bg-transparent my-2' name='description' type='text' defaultValue={estimate.description} />
            <input className='bg-transparent my-2' name='price' type='text' defaultValue={estimate.price} />
            {estimate.updatedAt === estimate.createdAt ? (
               <p>Prepared on {new Date(estimate.createdAt).toLocaleString()}</p>
            ) : (
               <>
                  <p>Prepared on {new Date(estimate.createdAt).toLocaleString()}</p>
                  <p>Updated on {new Date(estimate.updatedAt).toLocaleString()}</p>
               </>
            )}
            <input type='text' className='hidden' name='id' value={estimate.id} readOnly />
            <button type='submit' />
         </form>
      </div>
   );
};
