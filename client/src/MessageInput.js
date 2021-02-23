import React, { useState } from 'react';
import { sendBirdSelectors, withSendBird } from 'sendbird-uikit';
import {
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
} from '@material-ui/core';
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  input: {
    display: 'none',
  },
});

function CustomMessageInput({
  channel,
  encryptMessage,
  disabled,
  sendUserMessage,
  sendFileMessage,
  sdk,
}) {
  const classes = useStyles();

  // state
  const [inputText, setInputText] = useState('');
  const isInputEmpty = inputText.length < 1;

  // event handler
  const handleChange = (event) => {
    setInputText(event.target.value);
  };

  const sendFileMessage_ = (event) => {
    if (event.target.files && event.target.files[0]) {
      console.log(event.target.files[0]);

      // Implement your custom validation here
      if (event.target.files[0].size > 1 * 1000 * 1000) {
        alert('Image size greater than 1 MB');
        return;
      }

      const params = new sdk.FileMessageParams();
      params.file = event.target.files[0];

      sendFileMessage(channel.url, params)
        .then((message) => {
          event.target.value = '';
        })
        .catch((error) => {
          console.log(error.stack);
        });
    }
  };

  const sendUserMessage_ = (event) => {
    encryptMessage(channel, inputText).then((encryptedMessage) => {
      const params = new sdk.UserMessageParams();
      params.message = encryptedMessage;
      params.data = JSON.stringify({ isEncrypted: true });
      sendUserMessage(channel.url, params)
        .then((message) => {
          setInputText('');
        })
        .catch((error) => {
          console.log(error.message);
        });
    });
  };

  return (
    <div className='customized-message-input'>
      <FormControl variant='outlined' disabled={disabled} fullWidth>
        <InputLabel htmlFor='customized-message-input'>User Message</InputLabel>
        <OutlinedInput
          id='customized-message-input'
          type='txt'
          value={inputText}
          onChange={handleChange}
          labelWidth={105}
          multiline
          endAdornment={
            <InputAdornment position='end'>
              {isInputEmpty ? (
                <div className='customized-message-input__file-container'>
                  <input
                    accept='image/*'
                    id='icon-button-file'
                    type='file'
                    className={classes.input}
                    onChange={sendFileMessage_}
                  />
                  <label htmlFor='icon-button-file'>
                    <IconButton
                      color='primary'
                      aria-label='upload picture'
                      component='span'
                      disabled={disabled}
                    >
                      <AttachFileIcon
                        color={disabled ? 'disabled' : 'primary'}
                      />
                    </IconButton>
                  </label>
                </div>
              ) : (
                <IconButton disabled={disabled} onClick={sendUserMessage_}>
                  <SendIcon color={disabled ? 'disabled' : 'primary'} />
                </IconButton>
              )}
            </InputAdornment>
          }
        />
      </FormControl>
    </div>
  );
}

const mapStoreToProps = (store) => {
  const sendUserMessage = sendBirdSelectors.getSendUserMessage(store);
  const sdk = sendBirdSelectors.getSdk(store);
  const sendFileMessage = sendBirdSelectors.getSendFileMessage(store);
  return {
    sendUserMessage,
    sdk,
    sendFileMessage,
  };
};

export default withSendBird(CustomMessageInput, mapStoreToProps);
