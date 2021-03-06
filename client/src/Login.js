import React from 'react';
import { useHistory } from 'react-router-dom';

import { useAuth } from './utils/auth';

const Login = ({ setConfig }) => {
  const { login, register } = useAuth();
  const history = useHistory();

  const onLogin = (e) => {
    e.preventDefault();
    const { target } = e;

    const userId = target.userId.value;
    const nickname = target.nickname.value;
    const shouldRegister = target.registration.checked;

    if (shouldRegister) {
      register(userId, nickname)
        .then(({ sendbirdAccessToken, virgilToken }) => {
          setupChat({
            userId,
            nickname,
            accessToken: sendbirdAccessToken,
            virgilToken,
            didRegister: true,
          });
        })
        .catch((e) => {
          alert(e);
        });
    } else {
      login(userId)
        .then(({ sendbirdAccessToken, virgilToken }) => {
          setupChat({
            userId,
            nickname,
            accessToken: sendbirdAccessToken,
            virgilToken,
            didRegister: false,
          });
        })
        .catch((e) => {
          alert(e);
        });
    }
  };

  const setupChat = ({
    userId,
    nickname,
    accessToken,
    virgilToken,
    didRegister,
  }) => {
    setConfig({ userId, nickname, accessToken, virgilToken, didRegister });
    history.push('/chat');
  };

  return (
    <div>
      <h1>Login To Chat</h1>
      <form onSubmit={onLogin}>
        <label>userId: </label>
        <input name='userId' />
        <label>nickname: </label>
        <input name='nickname' />
        <label>create user?</label>
        <input name='registration' type='checkbox'></input>
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
