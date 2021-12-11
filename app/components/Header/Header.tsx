import React from 'react';
import { useAuth } from '../auth';
import { GLogout } from '../GLogout';
import { NavLink } from './NavLink';

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
   const { isSignedIn } = useAuth();
   return (
      <header className='sticky top-0 left-0 w-full flex h-12 bg-gray-600 justify-end gap-x-3'>
         <NavLink to='/'>Home</NavLink>
         {isSignedIn ? (
            <>
               <NavLink to='/profile'>Profile</NavLink>
               <GLogout />
            </>
         ) : (
            <NavLink to='/login'>Login</NavLink>
         )}
      </header>
   );
};
