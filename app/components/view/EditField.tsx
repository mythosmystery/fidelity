import React, { InputHTMLAttributes } from 'react';

export const EditField: React.FC<InputHTMLAttributes<HTMLInputElement>> = props => {
   return (
      <input
         {...props}
         className={`bg-transparent my-2 p-1 focus:outline-none focus:border-b-2 border-blue-400 ${props.className}`}
      />
   );
};
