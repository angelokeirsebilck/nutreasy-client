import { combineReducers } from 'redux';
import auth from './auth';
import alert from './alert';
import profile from './profile';
import food from './food';
import foodEntry from './foodEntry';

export default combineReducers({
  auth,
  alert,
  profile,
  food,
  foodEntry,
});
