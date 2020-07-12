import { combineReducers } from 'redux';
import auth from './auth';
import challenges from './create_challenge';
import currentChallenges from './current_challenges';

const rootReducer = combineReducers({
  auth,
  challenges,
  currentChallenges,
});

export default rootReducer;
