import React from 'react';

import { App as SendbirdApp } from 'sendbird-uikit';
import 'sendbird-uikit/dist/index.css';

const Chat = () => {
  return (
    <SendbirdApp
      appId='7A493E5B-B92F-4D01-AD41-7F568AA2AECA'
      userId='alex'
      nickname='Alex'
    />
  );
};

export default Chat;
