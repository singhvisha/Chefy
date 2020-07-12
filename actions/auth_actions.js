import api from '../utils/api_utils';
import {
  SET_TOKENS, SET_USER, API_FAIL,
} from '../constants';

export const setTokens = tokens => ({
  type: SET_TOKENS,
  payload: tokens,
});

export const setUser = tokens => dispatch => (
  api.get('https://api.codechef.com/users/me', {
    headers: {
      Authorization: `Bearer ${tokens.access_token}`,
    },
  })
    .then((res) => {
      dispatch({
        type: SET_USER,
        payload: res.data,
      });
    })
    .catch(response => (dispatch({ type: API_FAIL, data: response })))
);
