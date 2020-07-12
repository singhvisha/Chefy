import Cookies from 'js-cookie';
import shortid from 'shortid';
import axios from 'axios';
import api from '../utils/api_utils';
import {
  API_FAIL,
  GET_PROBLEMS_BY_CODE,
  GET_PROBLEMS_BY_CATEGORY,
  ADD_PROBLEM, REMOVE_PROBLEM,
  UPDATE_CHALLENGE_NAME,
  UPDATE_CHALLENGE_DURATION,
  CHALLENGE_CREATED,
  SET_PROBLEM_DETAILS,
  CLEAR_PROBLEM_DETAILS,
  SET_MORE_PROBLEMS,
  CLEAR_PROBLEM_LIST,
} from '../constants';

export const loadProblemByCode = (contestCode, problemCode) => (dispatch) => {
  api.get(`contests/${contestCode}/problems/${problemCode}?fields=body`, {
    headers: {
      Authorization: `Bearer ${Cookies.get('access_token')}`,
    },
  })
    .then((res) => {
      dispatch({
        type: GET_PROBLEMS_BY_CODE,
        payload: res.data,
      });
    })
    .catch((error) => {
      console.log(error);
      (dispatch({ type: API_FAIL, payload: error }));
    });
};

export const loadProblemsByCategory = category => (dispatch) => {
  api.get(`problems/${category}?fields=problemName,problemCode,accuracy&limit=20`, {
    headers: {
      Authorization: `Bearer ${Cookies.get('access_token')}`,
    },
  })
    .then((res) => {
      dispatch({
        type: GET_PROBLEMS_BY_CATEGORY,
        payload: res.data,
      });
    })
    .catch(error => (dispatch({ type: API_FAIL, data: error })));
};

export const loadMoreProblems = (category, offset) => (dispatch) => {
  api.get(`problems/${category}?fields=problemName,problemCode,accuracy&limit=20&offset=${offset}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get('access_token')}`,
    },
  })
    .then((res) => {
      dispatch({
        type: SET_MORE_PROBLEMS,
        payload: res.data,
      });
    })
    .catch(response => (dispatch({ type: API_FAIL, data: response })));
};

export const clearProblemList = () => (dispatch) => {
  dispatch({
    type: CLEAR_PROBLEM_LIST,
  });
};

export const setProblemDetails = (problemCode, contestCode = 'PRACTICE') => (dispatch) => {
  api.get(`contests/${contestCode}/problems/${problemCode}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get('access_token')}`,
    },
  })
    .then((res) => {
      dispatch({
        type: SET_PROBLEM_DETAILS,
        payload: res.data,
      });
    })
    .catch(error => (dispatch({ type: API_FAIL, payload: error })));
};

export const clearProblemDetails = () => (dispatch) => {
  dispatch({
    type: CLEAR_PROBLEM_DETAILS,
  });
};

export const addProblem = problem => (dispatch) => {
  dispatch({
    type: ADD_PROBLEM,
    payload: problem,
  });
};

export const removeProblem = problem => (dispatch) => {
  dispatch({
    type: REMOVE_PROBLEM,
    payload: problem,
  });
};

export const updateChallengeName = challengeName => (dispatch) => {
  dispatch({
    type: UPDATE_CHALLENGE_NAME,
    payload: challengeName,
  });
};

export const updateChallengeDuration = (target, value) => (dispatch) => {
  const data = {
    target,
    value,
  };
  dispatch({
    type: UPDATE_CHALLENGE_DURATION,
    payload: data,
  });
};

const postChallenge = (challenge, username) => {
  challenge.id = shortid.generate();
  const data = {
    challenge,
    user: username,
  };

  const promise = axios.post('/firebase/create_challenge', data, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  return promise;
};

export const createChallenge = (challenge, username) => (dispatch) => {
  postChallenge(challenge, username)
    .then(() => {
      dispatch({
        type: CHALLENGE_CREATED,
      });
    });
};
