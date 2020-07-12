import _ from 'lodash';
import { CHALLENGE_CREATED, SET_CURRENT_CHALLENGES, START_CHALLENGE } from '../constants';

const initialState = {
  challenges: [],
  fetchChallenges: true,
};

const currentChallenges = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case SET_CURRENT_CHALLENGES: {
      const challenges = _.cloneDeep(action.payload.challenges);
      _.reverse(challenges);
      newState.challenges = challenges;
      newState.fetchChallenges = false;
      return newState;
    }
    case CHALLENGE_CREATED: {
      newState.fetchChallenges = true;
      return newState;
    }
    case START_CHALLENGE: {
      newState.challenges = _.cloneDeep(action.payload.challenges);
      return newState;
    }

    default:
      return newState;
  }
};

export default currentChallenges;
