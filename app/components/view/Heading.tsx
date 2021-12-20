import React from 'react';

interface HeadingProps {}

export const Heading: React.FC<HeadingProps> = ({ children }) => {
   return <h1 className='text-5xl text-center text-blue-500 my-3'>{children}</h1>;
};
