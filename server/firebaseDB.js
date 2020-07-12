const firebase = require('firebase');
const express = require('express');
const _ = require('lodash');

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DB_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSENGING_SENDER_ID
};

firebase.initializeApp(config);

const Router = express.Router;
const firebaseDB = Router();
const db = firebase.database();

firebaseDB.post('/create_challenge', (req, res) => {
  const challenge = req.body.challenge;
  const user = req.body.user;
  let challenges = [];

  db.ref('users/' + user)
    .once('value')
    .then(snapshot => {
      challenges = ((snapshot.val() && snapshot.val().challenges) || []);
      challenges = _.concat(challenges, challenge);

      db.ref('users/' + user)
        .update({
          challenges: challenges
        })
        .then(() => {
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Content-Type', 'application/json');
          res.json({ success: true });
        })
        .catch(error => {
          console.log(error);
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Content-Type', 'application/json');
          res.json({
            success: false,
            error: error
          });
        })
    })
    .catch(error => {
      console.log(error);
    });
});

firebaseDB.post('/fetch_challenges', (req, res) => {
  const username = req.body.username;
  let challenges = [];

  db.ref('users/' + username).once('value')
    .then(snapshot => {
      challenges = ((snapshot.val() && snapshot.val().challenges) || []);
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Content-Type', 'application/json');
      res.json({ challenges: challenges});
    })
    .catch(error => {
      console.log(error);
    });
});

firebaseDB.post('/start_challenge', (req, res) => {
  const username = req.body.username;
  const newChallenge = req.body.challenge;
  let challenges = [];

  db.ref('users/' + username).once('value')
    .then(snapshot => {
      challenges = ((snapshot.val() && snapshot.val().challenges) || []);
      _.forEach(challenges, challenge => {
        if (challenge.name === newChallenge.name) {
          challenge.endTime = newChallenge.endTime;
        }
      });

      db.ref('users/' + username)
        .update({
          challenges: challenges
        })
        .then(() => {
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Content-Type', 'application/json');
          res.json({
            success: true,
            challenges: challenges
          });
        })
        .catch(error => {
          console.log(error);
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Content-Type', 'application/json');
          res.json({
            success: false,
            error: error
          });
        })
    })
    .catch(error => {
      console.log(error);
    });
});

module.exports = firebaseDB;
