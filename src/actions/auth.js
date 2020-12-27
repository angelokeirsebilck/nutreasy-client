import axios from 'axios';
import { API_URL} from '../config/settings';
import { LOGIN_SUCCES } from './types';

export const login = (email, password) => (dispatch) => {
  
  const body = {
    email,
    password,
  };

  try {
      const res = await axios.post(`${API_URL}/api/auth`,body);

      dispatch({
        type: LOGIN_SUCCES,
        payload: res.data,
      });
  } catch (error) {
    const errors = error.response.data.errors;
    console.log(errors);
  }
};
