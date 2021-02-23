import React, { useEffect, useState } from 'react';

import { ChannelSettings, SendBirdProvider } from 'sendbird-uikit';
import 'sendbird-uikit/dist/index.css';

import ChannelList from './ChannelList';
import Channel from './Channel';

import { useHistory } from 'react-router-dom';
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
  const [showSettings, setShowSettings] = useState(false);
  const [currentChannel, setCurrentChannel] = useState(null);

  const { initE3, isInitialized, registerUser } = useE3();

  useEffect(() => {
    if (!isInitialized && virgilToken) {
      initE3(virgilToken);
    }
    if (didRegister && isInitialized) {
      registerUser();
    }
  }, [isInitialized, didRegister]);

  return isInitialized ? (
    <SendBirdProvider
      appId='7A493E5B-B92F-4D01-AD41-7F568AA2AECA'
      userId={userId}
      nickname={nickname}
      accessToken={accessToken}
    >
      <div className='sendbird-app__wrap'>
        <div className='sendbird-app__channellist-wrap'>
          <ChannelList setCurrentChannel={setCurrentChannel} />
        </div>
        <div className='sendbird-app__conversation-wrap'>
          <Channel
            currentChannel={currentChannel}
            onChatHeaderActionClick={() => setShowSettings(true)}
          />
        </div>
      </div>
      {showSettings && (
        <div className='sendbird-app__settingspanel-wrap'>
          <ChannelSettings
            setShowSettings={setShowSettings}
            onCloseClick={() => setShowSettings(false)}
          />
        </div>
      )}
    </SendBirdProvider>
  ) : (
    <div>Waiting to init E3Kit</div>
  );
};

export default Chat;
