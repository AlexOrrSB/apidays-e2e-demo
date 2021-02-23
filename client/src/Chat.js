import React from 'react';

import { App as SendbirdApp } from 'sendbird-uikit';
import 'sendbird-uikit/dist/index.css';

const Chat = ({ userId, nickname, accessToken, virgilToken }) => {
  return (
    <SendbirdApp
      appId='7A493E5B-B92F-4D01-AD41-7F568AA2AECA'
      userId={userId}
      nickname={nickname}
      accessToken={accessToken}
    />
  );
};

export default Chat;
