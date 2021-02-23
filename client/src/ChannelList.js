import React from 'react';
import { ChannelList, sendBirdSelectors, withSendBird } from 'sendbird-uikit';
import cuid from 'cuid';
import { useE3 } from './utils/e3';

const CustomChannelList = ({ sdk, setCurrentChannel }) => {
  const userId = sdk?.currentUser?.userId;
  const { createGroup } = useE3();

  return (
    <ChannelList
      onChannelSelect={(channel) => setCurrentChannel(channel.url)}
      onBeforeCreateChannel={(selectedUsers) => {
        if (!sdk || !sdk.GroupChannelParams) {
          return;
        }
        const params = new sdk.GroupChannelParams();
        params.addUserIds(selectedUsers);
        const groupId = cuid();
        params.data = JSON.stringify({ ownerId: userId, groupId });
        const identites = [userId, ...selectedUsers];
        createGroup(groupId, identites);
        return params;
      }}
    />
  );
};

const mapSendbirdStateToProps = (state) => {
  return {
    sdk: sendBirdSelectors.getSdk(state),
  };
};

const CustomChannelListWithSendbird = withSendBird(
  CustomChannelList,
  mapSendbirdStateToProps,
);

export default CustomChannelListWithSendbird;
