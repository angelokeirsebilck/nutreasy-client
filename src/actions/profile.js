import { LOAD_PROFILE } from './types';
import axios from 'axios';
import { API_URL } from '../config/settings';

export const loadProfile = () => async (dispatch) => {
  try {
    const res = await axios.get(`${API_URL}/api/profile/me`);
    dispatch({
      type: LOAD_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};
