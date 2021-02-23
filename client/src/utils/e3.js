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

  const encryptMessage = async (channel, message) => {
    try {
      const group = await loadGroup(channel);
      return await group.encrypt(message);
    } catch (error) {
      console.error(error);
    }
  };

  const _decryptMessage = async (message, group) => {
    try {
      if (message.messageType === 'user' && message.sender) {
        const senderCart = await e3.findUsers(message.sender.userId);
        const decryptedMessage = await group.decrypt(
          message.message,
          senderCart,
        );
        return decryptedMessage;
      }
      return;
    } catch (error) {
      console.error(error);
    }
  };

  const decryptMessage = async (channel, message) => {
    const decryptedMessages = await decryptMessages(channel, [message]);
    return decryptedMessages.pop();
  };

  const decryptMessages = async (channel, messages) => {
    try {
      const group = await loadGroup(channel);

      const decryptedMessagesPromises = messages.map((message) => {
        return _decryptMessage(message, group).then((decryptedMessage) => {
          return decryptedMessage;
        });
      });

      return Promise.all(decryptedMessagesPromises);
    } catch (error) {
      console.error(error);
    }
  };

  const createGroup = async (groupId, participantIdentities) => {
    try {
      const participants = await e3.findUsers(participantIdentities);
      await e3.createGroup(groupId, participants);
    } catch (error) {
      console.error(error);
    }
  };

  const loadGroup = async (channel) => {
    try {
      const { ownerId, groupId } = JSON.parse(channel.data);
      const ownerCard = await e3.findUsers(ownerId);
      return await e3.loadGroup(groupId, ownerCard);
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
        encryptMessage,
        decryptMessage,
        decryptMessages,
        createGroup,
        loadGroup,
      }}
    >
      {children}
    </e3Context.Provider>
  );
};

export const useE3 = () => {
  const {
    initE3,
    isInitialized,
    registerUser,
    encryptMessage,
    decryptMessage,
    decryptMessages,
    createGroup,
    loadGroup,
  } = useContext(e3Context);

  return {
    initE3,
    isInitialized,
    registerUser,
    encryptMessage,
    decryptMessage,
    decryptMessages,
    createGroup,
    loadGroup,
  };
};
