import axios from 'axios';
import { API_FAIL, SET_CURRENT_CHALLENGES, START_CHALLENGE } from '../constants';

const fetchCurrentChallenges = (username) => {
  const data = {
    username,
  };
  const promise = axios.post('/firebase/fetch_challenges', data, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  return promise;
};

export const setCurrentChallenges = username => (dispatch) => {
  fetchCurrentChallenges(username)
    .then((res) => {
      dispatch({
        type: SET_CURRENT_CHALLENGES,
        payload: res.data,
      });
    })
    .catch(response => (dispatch({ type: API_FAIL, data: response })));
};

const postStartTime = (challenge, username) => {
  const newChallenge = { ...challenge };
  console.log(challenge);
  let seconds = newChallenge.duration.days * 24 * 60 * 60;
  seconds += newChallenge.duration.hours * 60 * 60;
  seconds += newChallenge.duration.minutes * 60;
  newChallenge.endTime = Date.now() + seconds * 1000;
  const data = {
    username,
    challenge: newChallenge,
  };
  const promise = axios.post('/firebase/start_challenge', data, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  return promise;
};

export const startChallenge = (challenge, username) => (dispatch) => {
  postStartTime(challenge, username)
    .then((res) => {
      dispatch({
        type: START_CHALLENGE,
        payload: res.data,
      });
    });
};
