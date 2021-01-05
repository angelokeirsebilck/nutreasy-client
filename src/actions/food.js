import {
  ADD_ERROR_FOOD,
  REMOVE_ERROR_FOOD,
  GET_FOOD,
  CLEAR_ALL_ERROR_FOOD,
  EDIT_FOOD_READY,
  GET_SEARCH_FOOD,
} from './types';
import axios from 'axios';
import { API_URL } from '../config/settings';
import { AsyncStorage } from 'react-native';

// Navigation
import NavigationService from '../../NavigationService';

// Actions
import { setAlert } from './alert';

import fatSecretApi from '../utils/fatSecret';

export const addError = (field, msg) => async (dispatch) => {
  dispatch({
    type: ADD_ERROR_FOOD,
    payload: {
      field,
      msg,
    },
  });
};

export const removeError = (field, msg) => async (dispatch) => {
  dispatch({
    type: REMOVE_ERROR_FOOD,
    payload: field,
  });
};

export const clearAllErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ALL_ERROR_FOOD,
  });
};

export const getFood = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.get(`${API_URL}/api/food`, config);
    dispatch({
      type: GET_FOOD,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createFood = (data) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post(`${API_URL}/api/food`, data, config);
    dispatch(getFood());
    NavigationService.navigate('OwnFood');
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'danger'));
      });
    }
  }
};

export const editFood = (data, id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.patch(`${API_URL}/api/food/${id}`, data, config);
    dispatch(getFood());
    NavigationService.navigate('OwnFood');
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'danger'));
      });
    }
  }
};

export const clearFood = () => (dispatch) => {
  dispatch({
    type: CLEAR_FOOD,
  });
};

export const editFoodReady = () => (dispatch) => {
  dispatch({
    type: EDIT_FOOD_READY,
  });
};

export const searchFood = (searchString) => async (dispatch) => {
  const fatSecretToken = await AsyncStorage.getItem('fatToken');

  const config = {
    headers: {
      Authorization: `Bearer ${fatSecretToken}`,
    },
  };

  try {
    const res = await fatSecretApi.get(
      `?method=foods.search&search_expression=${searchString}&format=json`,
      config
    );

    dispatch({
      type: GET_SEARCH_FOOD,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const searchFoodById = (id) => async (dispatch) => {
  const fatSecretToken = await AsyncStorage.getItem('fatToken');

  const config = {
    headers: {
      Authorization: `Bearer ${fatSecretToken}`,
    },
  };

  try {
    const res = await fatSecretApi.get(`?method=food.get.v2&food_id=${id}&format=json`, config);
    const servings = res.data.food.servings.serving;
    let filtered;
    if (servings.length > 0) {
      filtered = servings.filter((serving) => serving.measurement_description == 'g');
      return filtered[0];
    }

    return servings;
  } catch (error) {
    console.log(error);
  }
};
