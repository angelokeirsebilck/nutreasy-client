import {
  LOAD_PROFILE,
  SET_PROFILE,
  ADD_ERROR,
  REMOVE_ERROR,
  SET_BMR,
  SET_CALORIES,
  CLEAR_PROFILE,
  SET_LOADING_PROFILE,
} from './types';
import axios from 'axios';
import { API_URL } from '../config/settings';

// Navigation
import NavigationService from '../../NavigationService';

// Utils
import calcBMR from '../utils/BMRCalculator';

// Actions
import { getFood } from '../actions/food';

export const loadProfile = () => async (dispatch) => {
  dispatch({
    type: SET_LOADING_PROFILE,
    payload: true,
  });
  try {
    const res = await axios.get(`${API_URL}/api/profile/me`);
    dispatch({
      type: LOAD_PROFILE,
      payload: res.data,
    });
    dispatch({
      type: SET_LOADING_PROFILE,
      payload: false,
    });
    dispatch(
      setBmr(
        res.data.age,
        res.data.weight,
        res.data.height,
        res.data.gender,
        res.data.activityLevel,
        res.data.weightUnit,
        res.data.heightUnit
      )
    );
    dispatch(getFood());
  } catch (error) {
    console.log(error);
    dispatch({
      type: SET_LOADING_PROFILE,
      payload: false,
    });
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

export const addError = (field, msg) => async (dispatch) => {
  dispatch({
    type: ADD_ERROR,
    payload: {
      field,
      msg,
    },
  });
};

export const clearProfile = () => async (dispatch) => {
  dispatch({
    type: CLEAR_PROFILE,
  });
};

export const removeError = (field, msg) => async (dispatch) => {
  dispatch({
    type: REMOVE_ERROR,
    payload: field,
  });
};

export const setBmr = (age, weight, height, gender, activityLevel, weightUnit, heightUnit) => (
  dispatch
) => {
  const BMR = calcBMR(age, weight, height, gender, weightUnit, heightUnit);
  dispatch({
    type: SET_BMR,
    payload: BMR,
  });
  dispatch(setCalories(activityLevel));
};

export const setCalories = (activityLevel) => (dispatch) => {
  dispatch({
    type: SET_CALORIES,
    payload: activityLevel,
  });
};
