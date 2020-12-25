import { ADD_TEST, REMOVE_TEST } from '../actions/types';
const initialState = {
  test: 'Angelo',
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_TEST:
      return {
        ...state,
        test: 'ANGELOL',
      };
    case REMOVE_TEST:
      return {
        ...state,
        test: 'TEST NEW VALUE',
      };

    default:
      return state;
  }
}
