import { ADD_TEST, REMOVE_TEST } from './types';

export const addTest = () => (dispatch) => {
  dispatch({
    type: ADD_TEST,
    payload: true,
  });
};

export const removeTest = () => (dispatch) => {
  dispatch({
    type: REMOVE_TEST,
    payload: false,
  });
};
