import React from 'react';
import { Channel } from 'sendbird-uikit';
import MessageInput from './MessageInput';
import { useE3 } from './utils/e3';

const CustomChannel = ({ currentChannel, setShowSettings }) => {
  const { encryptMessage } = useE3();

  const onChatHeaderActionClick = () => {
    setShowSettings(true);
  };

  return (
    <Channel
      channelUrl={currentChannel?.url}
      onChatHeaderActionClick={onChatHeaderActionClick}
      renderMessageInput={({ channel, user, disabled }) => (
        <MessageInput
          channel={channel}
          disabled={disabled}
          encryptMessage={encryptMessage}
        />
      )}
    />
  );
};

export default CustomChannel;
