import React from 'react';
import { useAuth } from '../auth';
import { GLogout } from '../GLogout';
import { NavLink } from './NavLink';

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
   const { isSignedIn } = useAuth();
   return (
      <header className='sticky top-0 left-0 w-full bg-gray-900 flex h-10 border-b border-gray-700/50 shadow-md justify-end gap-x-3'>
         <NavLink to='/'>Home</NavLink>
         {isSignedIn ? (
            <>
               <NavLink to='/customers/list'>Customers</NavLink>
               <NavLink to='/repairs/list'>Repairs</NavLink>
               <NavLink to='/repairs/add'>New Repair</NavLink>
               <NavLink to='/profile'>Profile</NavLink>
               <GLogout />
            </>
         ) : (
            <NavLink to='/login'>Login</NavLink>
         )}
      </header>
   );
};
