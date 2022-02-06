import React, { TextareaHTMLAttributes } from 'react';

export const LargeField: React.FC<TextareaHTMLAttributes<HTMLTextAreaElement>> = props => {
   return (
      <textarea
         {...props}
         className={`bg-transparent p-1.5 resize-none border-b-2 focus:outline-none focus:border-blue-400 my-2 ${props.className}`}
      />
   );
};
