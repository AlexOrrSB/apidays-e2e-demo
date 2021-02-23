import React, { useState } from 'react';

import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';

const Message = ({
  message,
  decryptMessage,
  onDeleteMessage,
  onUpdateMessage,
}) => {
  const [decryptedMessage, setDecryptedMessage] = useState('');

  if (message.message && message.data) {
    const data = JSON.parse(message.data);
    if (data.isEncrypted) {
      decryptMessage(message).then((decryptedMessage) => {
        if (decryptedMessage) {
          setDecryptedMessage(decryptedMessage);
        }
      });
    }
  }

  return (
    <Paper style={{ display: 'flex' }}>
      <CardMedia
        image={message.sender && message.sender.profileUrl}
        style={{ width: 50, height: 50, marginTop: 25 }}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CardContent
          style={{ flex: '1 0 auto', minWidth: 180, textAlign: 'left' }}
        >
          <Typography variant='body1' noWrap style={{ width: 360 }}>
            {message.messageType === 'file' ? (
              <Link
                target='_blank'
                rel='noreferrer'
                variant='body2'
                href={message.url}
              >
                {message.name}
              </Link>
            ) : (
              `${decryptedMessage || 'ENCRYPTED MESSAGE'}`
            )}
          </Typography>
          <Typography variant='caption' color='textSecondary'>
            {new Date(message.createdAt).toDateString()}
            {` by
                ${
                  message.messageType === 'admin'
                    ? 'Channel Admin'
                    : message.sender && message.sender.userId
                }
              `}
          </Typography>
        </CardContent>
      </div>
    </Paper>
  );
};

export default Message;
