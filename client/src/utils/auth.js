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

  const register = async (userId, nickname) => {
    const response = await fetch('/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, nickname }),
    });
    const jsonResponse = await response.json();
    const { sendbirdAccessToken } = jsonResponse;
    return sendbirdAccessToken;
  };

  return (
    <authContext.Provider
      value={{
        login,
        register,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => {
  const { login, register } = useContext(authContext);

  return {
    login,
    register,
  };
};
