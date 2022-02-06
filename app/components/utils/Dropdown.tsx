import React from 'react';

interface DropdownProps {
   options: string[];
   name: string;
   currentOption: string;
}

export const Dropdown: React.FC<DropdownProps> = ({ options, name, currentOption: currentStatus }) => {
   return (
      <select name={name} className='bg-transparent focus:outline-none'>
         {options.map((option, i) => {
            return (
               <>
                  {currentStatus === option ? (
                     <option value={option} key={i} selected className='bg-gray-800'>
                        {option}
                     </option>
                  ) : (
                     <option value={option} key={i} className='bg-gray-800'>
                        {option}
                     </option>
                  )}
               </>
            );
         })}
      </select>
   );
};
