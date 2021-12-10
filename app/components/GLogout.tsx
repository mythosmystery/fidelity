import React from 'react';
import { GoogleLogout } from 'react-google-login';
import { useNavigate } from 'react-router';
import { web } from '../../google/client_secret_875138566928-r1d085gmj7cvfvlhv55vetse0mrpfis1.apps.googleusercontent.com.json';

interface GLogoutProps {
   redirectTo?: string;
}

export const GLogout: React.FC<GLogoutProps> = ({ redirectTo = '/' }) => {
   const navigate = useNavigate();

   const onLogoutSuccess = () => {
      fetch('/logout', { method: 'POST' });
      navigate(redirectTo);
   };

   return <GoogleLogout clientId={web.client_id} onLogoutSuccess={onLogoutSuccess} />;
};
