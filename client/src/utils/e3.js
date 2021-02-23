import React, { createContext, useContext, useState } from 'react';
import { EThree } from '@virgilsecurity/e3kit-browser';

const e3Context = createContext();

export const E3Provider = ({ children }) => {
  const [e3, setE3] = useState();
  const [isInitialized, setIsInitialized] = useState(false);

  const initE3 = async (virgilToken) => {
    try {
      const e3 = await EThree.initialize(() => virgilToken);
      setE3(e3);
      setIsInitialized(true);
    } catch (error) {
      console.error(error);
    }
  };

  const registerUser = async () => {
    try {
      e3.register();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <e3Context.Provider
      value={{
        initE3,
        isInitialized,
        registerUser,
      }}
    >
      {children}
    </e3Context.Provider>
  );
};

export const useE3 = () => {
  const { initE3, isInitialized, registerUser } = useContext(e3Context);

  return {
    initE3,
    isInitialized,
    registerUser,
  };
};
