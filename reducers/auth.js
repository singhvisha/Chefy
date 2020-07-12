import { REFRESH_ACCESS_TOKEN, SET_TOKENS, SET_USER } from '../constants';

const initialState = {
  access_token: null,
  refresh_token: null,
  user: {
    fullname: null,
    username: null,
  },
};

const auth = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case SET_TOKENS: {
      newState.access_token = action.payload.access_token;
      newState.refresh_token = action.payload.refresh_token;
      return newState;
    }
    case SET_USER: {
      newState.user = {
        ...newState.user,
        fullname: action.payload.result.data.content.fullname,
        username: action.payload.result.data.content.username,
      };
      return newState;
    }
    case REFRESH_ACCESS_TOKEN: {
      newState.access_token = action.payload.access_token;
      return newState;
    }
    default:
      return state;
  }
};

export default auth;
