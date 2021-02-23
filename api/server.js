require('dotenv').config();

const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

// Sendbird Constants
const sendbirdAppId = process.env.SENDBIRD_APP_ID;
const sendbirdApiToken = process.env.SENDBIRD_API_TOKEN;
const sendbirdBaseUrl = `https://api-${sendbirdAppId}.sendbird.com`;
const sendbirdHeaders = {
  'Content-Type': 'application/json',
  'Api-Token': sendbirdApiToken,
};

// Login
app.post('/login', bodyParser.json(), async (req, res) => {
  const { body } = req;
  const { userId } = body;
  const sendbirdUser = await getSendbirdUser(userId);
  const sendbirdAccessToken = sendbirdUser.access_token;
  res.status(200).json({ sendbirdAccessToken });
});

const getSendbirdUser = async (userId) => {
  const response = await fetch(`${sendbirdBaseUrl}/v3/users/${userId}`, {
    headers: sendbirdHeaders,
  });
  return await response.json();
};

// Register
app.post('/register', bodyParser.json(), async (req, res) => {
  const { body } = req;
  const { userId, nickname } = body;
  const sendbirdUser = await createSendbirdUser(userId, nickname);
  const sendbirdAccessToken = sendbirdUser.access_token;
  res.status(200).json({ sendbirdAccessToken });
});

const createSendbirdUser = async (userId, nickname) => {
  const response = await fetch(`${sendbirdBaseUrl}/v3/users`, {
    method: 'POST',
    headers: sendbirdHeaders,
    body: JSON.stringify({
      user_id: userId,
      nickname,
      profile_url: '',
      issue_access_token: true,
    }),
  });
  return await response.json();
};

app.listen(port, () => {
  console.log(`API server started on port ${port}`);
});
