import React from 'react';
import { Link } from 'remix';

interface NavLinkProps {
   to?: string;
}

export const NavLink: React.FC<NavLinkProps> = ({ children, to = '' }) => {
   return (
      <Link
         to={to}
         className='flex hover:border-b-2 border-gray-700 text-blue-600 hover:text-blue-400 px-3 text-xl items-center'
      >
         {children}
      </Link>
   );
};
