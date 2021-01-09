import {
  CLEAR_PROFILE,
  LOAD_PROFILE,
  SET_PROFILE,
  ADD_ERROR,
  REMOVE_ERROR,
  SET_BMR,
  SET_CALORIES,
  SET_LOADING_PROFILE,
} from '../actions/types';

const initialState = {
  profile: null,
  errors: [],
  BMR: null,
  calories: null,
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_PROFILE:
    case LOAD_PROFILE:
      return {
        ...state,
        profile: payload,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        BMR: null,
        calories: null,
        errors: [],
        loading: true,
      };
    case ADD_ERROR:
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
    case REMOVE_ERROR:
      let removed = state.errors.filter((e) => e.field !== action.payload);
      return {
        ...state,
        errors: removed,
      };
    case SET_BMR:
      return {
        ...state,
        BMR: payload,
      };
    case SET_LOADING_PROFILE:
      return {
        ...state,
        loading: payload,
      };
    case SET_CALORIES:
      let calories = parseFloat((state.BMR * payload).toFixed(0));
      switch (state.profile.goals.weight) {
        case 'maintain':
          calories = calories;
          break;
        case 'loss':
          calories = calories - 500;
          break;
        case 'gain':
          calories = calories + 500;
          break;
        default:
          break;
      }

      return {
        ...state,
        calories,
      };
    default:
      return state;
  }
}
