import React, { useEffect } from 'react';

import { App as SendbirdApp } from 'sendbird-uikit';
import 'sendbird-uikit/dist/index.css';
import { useE3 } from './utils/e3';

const Chat = ({
  userId,
  nickname,
  accessToken,
  virgilToken,
  didRegister = false,
}) => {
  const history = useHistory();
  useEffect(() => {
    if (!userId || !nickname) {
      history.push('/');
    }
  }, [userId, nickname, history]);

  const { initE3, isInitialized, registerUser } = useE3();

  useEffect(() => {
    if (!isInitialized) {
      initE3(virgilToken);
    }
    if (didRegister && isInitialized) {
      registerUser();
    }
  }, [isInitialized, didRegister]);

  return isInitialized ? (
    <SendbirdApp
      appId='7A493E5B-B92F-4D01-AD41-7F568AA2AECA'
      userId={userId}
      nickname={nickname}
      accessToken={accessToken}
    />
  ) : (
    <div>Waiting to init E3Kit</div>
  );
};

export default Chat;
