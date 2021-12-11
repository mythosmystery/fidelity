import React from 'react';
import { GoogleLogout } from 'react-google-login';
import { useNavigate } from 'react-router';
import { web } from '../../google/client_secret_875138566928-r1d085gmj7cvfvlhv55vetse0mrpfis1.apps.googleusercontent.com.json';
import { useAuth } from './auth';

interface GLogoutProps {
   redirectTo?: string;
}

export const GLogout: React.FC<GLogoutProps> = ({ redirectTo = '/' }) => {
   const { setSignedIn } = useAuth();
   const navigate = useNavigate();

   const onLogoutSuccess = () => {
      fetch('/logout', { method: 'POST' });
      setSignedIn(false);
      navigate(redirectTo);
   };

   return <GoogleLogout clientId={web.client_id} onLogoutSuccess={onLogoutSuccess} />;
};
