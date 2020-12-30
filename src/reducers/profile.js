import {
  CLEAR_PROFILE,
  LOAD_PROFILE,
  SET_PROFILE,
  ADD_ERROR,
  REMOVE_ERROR,
  SET_BMR,
} from '../actions/types';

const initialState = {
  profile: null,
  errors: [],
  BMR: null,
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
        errors: [],
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

    default:
      return state;
  }
}
