import axios from 'axios';
import { API_URL } from '../config/settings';
import { LOGIN_SUCCES, USER_LOADED, LOGOUT, REGISTER_FAIL, REGISTER_SUCCES } from './types';
import { AsyncStorage } from 'react-native';
import setAuthToken from '../utils/setAuthToken';

export const loadUser = () => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem('token');
    setAuthToken(token);
    const res = await axios.get(`${API_URL}/api/auth`);
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
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
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        console.log(error.msg);
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

    dispatch({
      type: LOGIN_SUCCES,
      payload: res.data.token,
    });
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        console.log(error.msg);
      });
    }
  }
};

// Logout User / Clear Profile
export const logout = () => async (dispatch) => {
  await AsyncStorage.removeItem('token');
  dispatch({
    type: LOGOUT,
  });
};
