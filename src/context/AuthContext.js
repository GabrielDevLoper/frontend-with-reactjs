import React, { createContext } from 'react';
import useAuth from './hooks/useAuth';

const Context = createContext();

function AuthProvider({ children }) {
  const { handleLogin, authenticated, handleLogout, loading } = useAuth();

  return (
    <Context.Provider
      value={{ handleLogin, authenticated, handleLogout, loading }}>
      {children}
    </Context.Provider>
  );
}

export { Context, AuthProvider };
