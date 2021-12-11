import { createContext, FC, useContext, useState } from 'react';

type AuthContextType = {
   isSignedIn: boolean;
   toggleSignIn: () => void;
   setSignedIn: (val: boolean) => void;
};
interface AuthProvider {
   initialState: boolean;
}

const AuthContext = createContext<AuthContextType>(null as any);

export const AuthProvider: FC<AuthProvider> = ({ children, initialState = false }) => {
   const [isSignedIn, setSignedIn] = useState(initialState);
   const toggleSignIn = () => setSignedIn(!isSignedIn);
   return <AuthContext.Provider value={{ isSignedIn, setSignedIn, toggleSignIn }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
   return useContext(AuthContext);
};
