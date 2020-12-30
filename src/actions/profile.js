import { LOAD_PROFILE, SET_PROFILE, ADD_ERROR, REMOVE_ERROR, SET_BMR } from './types';
import axios from 'axios';
import { API_URL } from '../config/settings';

// Navigation
import NavigationService from '../../NavigationService';

// Utils
import calcBMR from '../utils/BMRCalculator';

export const loadProfile = () => async (dispatch) => {
  try {
    const res = await axios.get(`${API_URL}/api/profile/me`);
    dispatch({
      type: LOAD_PROFILE,
      payload: res.data,
    });
    dispatch(setBmr(res.data.age, res.data.weight, res.data.height, res.data.gender));
  } catch (error) {
    console.log(error);
  }
};

// Create or Update Profile
export const createProfile = (data) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post(`${API_URL}/api/profile`, data, config);

    dispatch({
      type: SET_PROFILE,
      payload: res.data,
    });
    NavigationService.navigate('Home');
  } catch (error) {
    console.log(error);
  }
};

// Add Error
export const addError = (field, msg) => async (dispatch) => {
  dispatch({
    type: ADD_ERROR,
    payload: {
      field,
      msg,
    },
  });
};

// Remove Error
export const removeError = (field, msg) => async (dispatch) => {
  dispatch({
    type: REMOVE_ERROR,
    payload: field,
  });
};

// Set BMR
export const setBmr = (age, weight, height, gender) => (dispatch) => {
  const BMR = calcBMR(age, weight, height, gender);
  dispatch({
    type: SET_BMR,
    payload: BMR,
  });
};
