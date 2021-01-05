import {
  ADD_ERROR_FOOD,
  REMOVE_ERROR_FOOD,
  GET_FOOD,
  CLEAR_FOOD,
  CLEAR_ALL_ERROR_FOOD,
  EDIT_FOOD_READY,
  GET_SEARCH_FOOD,
} from '../actions/types';

const initialState = {
  errors: [],
  food: null,
  editFoodLoading: true,
  searchedFood: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_ERROR_FOOD:
      let newArray = [
        ...state.errors,
        {
          field: action.payload.field,
          msg: action.payload.msg,
        },
      ];
      return {
        ...state,
        errors: newArray,
      };
    case REMOVE_ERROR_FOOD:
      let removed = state.errors.filter((e) => e.field !== action.payload);
      return {
        ...state,
        errors: removed,
      };
    case CLEAR_ALL_ERROR_FOOD:
      return {
        ...state,
        errors: [],
      };
    case GET_FOOD:
      return {
        ...state,
        food: payload,
      };
    case GET_SEARCH_FOOD:
      return {
        ...state,
        searchedFood: payload.foods.food,
      };
    case CLEAR_FOOD:
      return {
        ...state,
        food: null,
      };
    case EDIT_FOOD_READY:
      return {
        ...state,
        editFoodLoading: false,
      };
    default:
      return state;
  }
}
