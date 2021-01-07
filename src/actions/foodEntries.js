import { GET_FOOD_ENTRIES, SET_DATE } from './types';

import axios from 'axios';
import { API_URL } from '../config/settings';

export const getFoodEntries = (date) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const data = {
      date,
    };

    const res = await axios.post(`${API_URL}/api/foodEntry/day`, data, config);

    dispatch({
      type: GET_FOOD_ENTRIES,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const setDate = (date) => (dispatch) => {
  dispatch({
    type: SET_DATE,
    payload: date,
  });
};
