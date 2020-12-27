import { LOGIN_SUCCES } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  token: null,
  user: null,
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_SUCCES:
      return {
        ...state,
        isAuthenticated: true,
        token: payload,
      };

    default:
      return state;
  }
}
