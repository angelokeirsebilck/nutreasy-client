import { CLEAR_PROFILE, LOAD_PROFILE } from '../actions/types';
const initialState = {
  profile: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOAD_PROFILE:
      return {
        ...state,
        profile: payload,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
      };

    default:
      return state;
  }
}
