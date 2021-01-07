import { GET_FOOD_ENTRIES, SET_DATE } from '../actions/types';
import moment from 'moment';

var nowDate = new Date(Date.now());

const initialState = {
  date: nowDate,
  foodEntries: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_FOOD_ENTRIES:
      return {
        ...state,
        foodEntries: payload,
      };
    case SET_DATE:
      return {
        ...state,
        date: payload,
      };
    default:
      return state;
  }
}
