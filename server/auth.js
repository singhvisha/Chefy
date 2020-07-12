const express = require('express');
const querystring = require('querystring');
const request = require('request');
const AppConfig = require('../config/app');
const AuthConfig = require('../config/auth');

const Router = express.Router;

const redirect_uri = `${AppConfig.HOST}:${process.env.PORT}/auth/callback`;
const client_id = AuthConfig.CLIENT_ID;
const client_secret = AuthConfig.CLIENT_SECRET;

const auth = Router();
/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = (length) => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const stateKey = 'auth_state';

auth.get('/login', (req, res) => {
  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  res.redirect(
    `https://api.codechef.com/oauth/authorize?${
      querystring.stringify({
        response_type: 'code',
        client_id,
        redirect_uri,
        state,
      })}`,
  );
});

auth.get('/callback', (req, res) => {
  // your application requests refresh and access tokens
  // after checking the state parameter

  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    console.log('state mismatch', `state: ${state}`, `storedState ${storedState}`, 'cookies ', req.cookies);
    res.render('pages/callback', {
      access_token: null,
      expires_in: null,
    });
  } else {
    res.clearCookie(stateKey);

    const authOptions = {
      url: 'https://api.codechef.com/oauth/token',
      form: {
        code,
        redirect_uri,
        grant_type: 'authorization_code',
        client_id,
        client_secret,
      },
      headers: {
        Authorization: `Basic ${new Buffer(`${client_id}:${client_secret}`).toString('base64')}`,
      },
      json: true,
    };

    request.post(authOptions, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const access_token = body.result.data.access_token;
        const refresh_token = body.result.data.refresh_token;

        res.cookie('access_token', access_token, {
          maxAge: 3600 * 1000
        });
        res.cookie('refresh_token', refresh_token);

        res.redirect(`${AppConfig.HOST}:${process.env.PORT}`);
      } else {
        console.log(error);
      }
    });
  }
});

auth.post('/token', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const refreshToken = req.cookies ? req.cookies['refresh_token'] : null;
  if (refreshToken) {
    const authOptions = {
      url: 'https://api.codechef.com/oauth/token',
      form: {
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
        client_id,
        client_secret,
      },
      headers: {
        Authorization: `Basic ${new Buffer(`${client_id}:${client_secret}`).toString('base64')}`,
      },
      json: true,
    };
    request.post(authOptions, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const access_token = body.result.data.access_token;
        const refresh_token = body.result.data.refresh_token;
        const expires_in = body.result.data.expires_in;
        res.cookie('access_token', access_token, {
          maxAge: 3600 * 1000
        });
        res.cookie('refresh_token', refresh_token);
        res.setHeader('Content-Type', 'application/json');
        res.send(
          JSON.stringify({
            access_token,
            expires_in,
            refresh_token,
          }),
        );
      } else {
        console.log("Error:", error);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ success: false }));
      }
    });
  } else {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ success: false }));
  }
});

module.exports = auth;
