import {
  GET_FOOD_ENTRIES,
  SET_DATE,
  SET_MOMENT,
  SET_SELECTED_FOOD,
  CLEAR_SELECTED_FOOD,
  REMOVE_SELECTED_FOOD,
  SET_AMOUNT,
  CLEAR_FOOD_ENTRIES,
  SET_SELECTED_FOOD_LIST,
  SET_LOADING_FALSE,
  CALC_TOTALS_DONE,
  SET_HOME_TOTALS,
} from '../actions/types';

var nowDate = new Date(Date.now());

const initialState = {
  date: nowDate,
  moment: null,
  selectedFood: [],
  foodEntries: '',
  loading: true,
  totalsMoment: {
    carbsTotal: 0,
    proteinTotal: 0,
    caloriesTotal: 0,
    fatTotal: 0,
  },
  totals: {
    carbsTotal: 0,
    proteinTotal: 0,
    caloriesTotal: 0,
    fatTotal: 0,
  },
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
    case SET_SELECTED_FOOD_LIST:
      return {
        ...state,
        selectedFood: payload,
      };
    case CLEAR_SELECTED_FOOD:
      return {
        ...state,
        selectedFood: [],
      };
    case CLEAR_FOOD_ENTRIES:
      return {
        ...state,
        date: nowDate,
        moment: null,
        selectedFood: [],
        foodEntries: '',
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

    case SET_LOADING_FALSE:
      return {
        ...state,
        loading: payload,
      };

    case CALC_TOTALS_DONE:
      return {
        ...state,
        totalsMoment: payload,
      };
    case SET_HOME_TOTALS:
      return {
        ...state,
        totals: payload,
      };
    default:
      return state;
  }
}
