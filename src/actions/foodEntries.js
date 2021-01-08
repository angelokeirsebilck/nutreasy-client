import {
  GET_FOOD_ENTRIES,
  SET_FOOD_ENTRIES,
  SET_DATE,
  SET_MOMENT,
  SET_SELECTED_FOOD,
  REMOVE_SELECTED_FOOD,
  CLEAR_SELECTED_FOOD,
  SET_AMOUNT,
} from './types';

import axios from 'axios';
import { API_URL } from '../config/settings';

// Navigation
import NavigationService from '../../NavigationService';

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

export const saveFoodEntries = (date, food, skip) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const data = {
      date,
      food,
      skip,
    };
    console.log(data);
    const res = await axios.post(`${API_URL}/api/foodEntry`, data, config);

    dispatch({
      type: GET_FOOD_ENTRIES,
      payload: res.data,
    });
    NavigationService.navigate('Food');
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

export const setMoment = (moment) => (dispatch) => {
  dispatch({
    type: SET_MOMENT,
    payload: moment,
  });
};

export const setSelectedFood = (
  foodItemId,
  name,
  calories,
  unit,
  measurementDescription,
  carbs,
  protein,
  fat,
  amount
) => (dispatch) => {
  const payload = {
    foodItem: foodItemId,
    name,
    calories,
    unit,
    measurementDescription,
    carbs,
    protein,
    fat,
    amount,
  };

  dispatch({
    type: SET_SELECTED_FOOD,
    payload,
  });
};

export const removeSelectedFood = (foodItemId) => (dispatch) => {
  dispatch({
    type: REMOVE_SELECTED_FOOD,
    payload: foodItemId,
  });
};

export const clearSelectedFood = () => (dispatch) => {
  dispatch({
    type: CLEAR_SELECTED_FOOD,
  });
};

export const setAmount = (id, amount) => (dispatch) => {
  dispatch({
    type: SET_AMOUNT,
    payload: {
      id,
      amount,
    },
  });
};
