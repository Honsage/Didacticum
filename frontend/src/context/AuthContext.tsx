import React, { createContext, useContext, useState, useCallback } from 'react';
import { getCookie, setCookie, deleteCookie } from '../utils/cookie';

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => {
    const cookieToken = getCookie('auth_token');
    return cookieToken || null;
  });

  const login = useCallback((newToken: string) => {
    setCookie('auth_token', newToken, { expires: 3600 });
    setToken(newToken);
  }, []);

  const logout = useCallback(() => {
    deleteCookie('auth_token');
    setToken(null);
  }, []);

  const value = {
    isAuthenticated: !!token,
    token,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
