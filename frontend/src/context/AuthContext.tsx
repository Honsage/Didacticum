import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCookie, setCookie, deleteCookie } from '../utils/cookie';

interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = getCookie('auth_token');
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const login = (newToken: string) => {
    setToken(newToken);
    setCookie('auth_token', newToken, { expires: 3600 });
  };

  const logout = () => {
    setToken(null);
    deleteCookie('auth_token');
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth должен быть использован внутри AuthProvider');
  return context;
};
