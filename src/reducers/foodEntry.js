import {
  GET_FOOD_ENTRIES,
  SET_DATE,
  SET_MOMENT,
  SET_SELECTED_FOOD,
  CLEAR_SELECTED_FOOD,
  REMOVE_SELECTED_FOOD,
  SET_AMOUNT,
} from '../actions/types';
import moment from 'moment';

var nowDate = new Date(Date.now());

const initialState = {
  date: nowDate,
  moment: null,
  selectedFood: [],
  foodEntries: '',
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
    case SET_MOMENT:
      return {
        ...state,
        moment: payload,
      };
    case SET_SELECTED_FOOD:
      return {
        ...state,
        selectedFood: [...state.selectedFood, payload],
      };
    case CLEAR_SELECTED_FOOD:
      return {
        ...state,
        selectedFood: [],
      };
    case REMOVE_SELECTED_FOOD:
      let filtered = state.selectedFood.filter((item) => item.foodItem != payload);
      return {
        ...state,
        selectedFood: filtered,
      };
    case SET_AMOUNT:
      let newSelectedFood = state.selectedFood.map((item) => {
        const newItem = item;
        if (newItem.foodItem == payload.id) {
          newItem.amount = parseFloat(payload.amount);
        }
        return newItem;
      });

      return {
        ...state,
        selectedFood: newSelectedFood,
      };
    default:
      return state;
  }
}
