import {
  LOGIN_SUCCES,
  USER_LOADED,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_SUCCES,
} from '../actions/types';

const initialState = {
  isAuthenticated: false,
  token: null,
  user: null,
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        user: payload,
        loading: false,
      };
    case LOGIN_SUCCES:
    case REGISTER_SUCCES:
      return {
        ...state,
        isAuthenticated: true,
        token: payload,
        loading: false,
      };
    case LOGOUT:
    case REGISTER_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        loading: false,
        user: null,
      };
    default:
      return state;
  }
}
