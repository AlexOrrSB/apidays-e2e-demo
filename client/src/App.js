import React, { useState } from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Chat from './Chat';
import Login from './Login';

const App = () => {
  const [config, setConfig] = useState({});

  return (
    <div className='App' style={{ height: '100vh' }}>
      <Router>
        <Switch>
          <Route path='/chat'>
            <Chat
              userId={config.userId}
              nickname={config.nickname}
              accessToken={config.accessToken}
            />
          </Route>
          <Route path='/'>
            <Login setConfig={setConfig} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
