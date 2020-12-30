import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { API_URL } from '../config/settings';
import {
  LOGIN_SUCCES,
  USER_LOADED,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_SUCCES,
  CLEAR_PROFILE,
} from './types';
import setAuthToken from '../utils/setAuthToken';
import { setAlert } from './alert';
import { loadProfile } from './profile';
import NavigationService from '../../NavigationService';

export const loadUser = (navigation = null) => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem('token');
    setAuthToken(token);
    const res = await axios.get(`${API_URL}/api/auth`);
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
    if (navigation != null) navigation.navigate('Home');
    dispatch(loadProfile());
  } catch (error) {
    console.log(error);
  }
};

export const register = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({
    email,
    password,
  });

  try {
    const res = await axios.post(`${API_URL}/api/users`, body, config);
    await AsyncStorage.setItem('token', res.data.token);
    dispatch({
      type: REGISTER_SUCCES,
      payload: res.data.token,
    });
    dispatch(loadUser());
    NavigationService.navigate('Home');
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'danger'));
      });
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

export const loginUser = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = {
    email,
    password,
  };
  try {
    const res = await axios.post(`${API_URL}/api/auth`, body, config);
    await AsyncStorage.setItem('token', res.data.token);
    dispatch({
      type: LOGIN_SUCCES,
      payload: res.data.token,
    });
    dispatch(loadUser());
    dispatch(loadProfile());
    NavigationService.navigate('Home');
  } catch (error) {
    console.log(error);
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'danger'));
      });
    }
  }
};

// Logout User
export const logout = () => async (dispatch) => {
  await AsyncStorage.removeItem('token');
  dispatch({
    type: LOGOUT,
  });
  dispatch({
    type: CLEAR_PROFILE,
  });
};
