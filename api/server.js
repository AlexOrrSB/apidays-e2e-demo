require('dotenv').config();

const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

const {
  initCrypto,
  VirgilCrypto,
  VirgilAccessTokenSigner,
} = require('virgil-crypto');
const { JwtGenerator } = require('virgil-sdk');

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
  const generator = await generatorPromise;
  const virgilJwtToken = generator.generateToken(userId);
  res.status(200).json({ sendbirdAccessToken, virgilToken: virgilJwtToken.toString() });
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
  const generator = await generatorPromise;
  const virgilJwtToken = generator.generateToken(userId);
  res.status(200).json({ sendbirdAccessToken, virgilToken: virgilJwtToken.toString() });
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

// Virgil JWT Generator
const getJwtGenerator = async () => {
  await initCrypto();

  const virgilCrypto = new VirgilCrypto();

  return new JwtGenerator({
    appId: process.env.VIRGIL_APP_ID,
    apiKeyId: process.env.VIRGIL_APP_KEY_ID,
    apiKey: virgilCrypto.importPrivateKey(process.env.VIRGIL_APP_KEY),
    accessTokenSigner: new VirgilAccessTokenSigner(virgilCrypto),
  });
};

const generatorPromise = getJwtGenerator();

app.listen(port, () => {
  console.log(`API server started on port ${port}`);
});
