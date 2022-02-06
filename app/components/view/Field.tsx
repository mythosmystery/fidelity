import React, { InputHTMLAttributes } from 'react';

export const Field: React.FC<InputHTMLAttributes<HTMLInputElement>> = props => {
   return (
      <input
         {...props}
         className={`bg-transparent border-b-2 focus:outline-none focus:border-blue-400 my-2 p-1.5 ${props.className}`}
      />
   );
};
