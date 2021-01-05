import { combineReducers } from 'redux';
import auth from './auth';
import alert from './alert';
import profile from './profile';
import food from './food';

export default combineReducers({
  auth,
  alert,
  profile,
  food,
});
