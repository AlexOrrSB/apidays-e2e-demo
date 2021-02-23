import React, { Fragment } from 'react';
import { Channel } from 'sendbird-uikit';
import MessageInput from './MessageInput';
import Message from './Message'
import { useE3 } from './utils/e3';

const CustomChannel = ({ currentChannel, setShowSettings }) => {
  const { encryptMessage, decryptMessage } = useE3();

  const onChatHeaderActionClick = () => {
    setShowSettings(true);
  };

  return (
    <Channel
      channelUrl={currentChannel?.url}
      onChatHeaderActionClick={onChatHeaderActionClick}
      renderChatItem={({ message, onDeleteMessage, onUpdateMessage }) => {
        return (
          <Message
            message={message}
            onDeleteMessage={onDeleteMessage}
            onUpdateMessage={onUpdateMessage}
            decryptMessage={(message) =>
              decryptMessage(currentChannel, message)
            }
          ></Message>
        );
      }}
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
