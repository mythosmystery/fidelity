import React from 'react';
import GoogleLogin from 'react-google-login';
import { useNavigate } from 'react-router';
import { web } from '../../google/client_secret_875138566928-r1d085gmj7cvfvlhv55vetse0mrpfis1.apps.googleusercontent.com.json';

interface GLoginProps {
   redirectTo?: string;
}

export const GLogin: React.FC<GLoginProps> = ({ redirectTo = '/' }) => {
   const navigate = useNavigate();

   const handleSuccess = async (response: any) => {
      console.log('handle success triggered');
      await fetch('/g/login', { method: 'POST', body: JSON.stringify(response) });
      navigate(redirectTo);
   };
   const handleFail = () => {
      console.log('fail');
   };
   return <GoogleLogin clientId={web.client_id} onSuccess={handleSuccess} onFailure={handleFail} />;
};
