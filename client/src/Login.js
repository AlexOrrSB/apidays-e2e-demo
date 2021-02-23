import React from 'react';
import { useHistory } from 'react-router-dom';

import { useAuth } from './utils/auth';

const Login = ({ setConfig }) => {
  const { login } = useAuth();
  const history = useHistory();

  const onLogin = (e) => {
    e.preventDefault();
    const { target } = e;

    const userId = target.userId.value;
    const nickname = target.nickname.value;

    login(userId)
      .then((sendbirdAccessToken) => {
        setConfig({ userId, nickname, accessToken: sendbirdAccessToken });
        history.push('/chat');
      })
      .catch((e) => {
        alert(e);
      });
  };

  return (
    <div>
      <h1>Login To Chat</h1>
      <form onSubmit={onLogin}>
        <label>userId: </label>
        <input name='userId' />
        <label>nickname: </label>
        <input name='nickname' />
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
