import React, { createContext, useContext } from 'react';

const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const login = async (userId) => {
    const response = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    });
    const jsonResponse = await response.json();
    const { sendbirdAccessToken } = jsonResponse;
    return sendbirdAccessToken;
  };

  return (
    <authContext.Provider
      value={{
        login,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => {
  const { login } = useContext(authContext);

  return {
    login,
  };
};
