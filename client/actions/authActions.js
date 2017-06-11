import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { SET_CURRENT_USER } from './types';


export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function logout() {
  return dispatch => {
    localStorage.removeItem('jwtToken');
    setToken(false);
    dispatch(setCurrentUser({}));
  }
}

export function login(data) {
  return dispatch => {
    return axios.post('/login', data).then(res => {
      const token = res.data.token;
      localStorage.setItem('jwtToken', token);
      setToken(token);
      dispatch(setCurrentUser(data.username));//jwtDecode(token)));
    });
  }
}

export function setToken(token){
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
}
