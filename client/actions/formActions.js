import axios from 'axios';
import config from '../../server/config'
const authenficatedUrl = config.url.authenticated;
const signupUrl = config.url.signup;
const existsUrl = config.url.exists;



export function signUp(formdata) {
  return dispatch => {
    console.log(formdata);
    return axios.post(`${signupUrl}`, formdata.data);
  }
}

export function exists(e, form) {
  return dispatch => {
    const name = e.target.name;
    const value = e.target.value;
    return axios.get(`${existsUrl}/${value}`).then(res => {
      let errors = form.state.errors;
      if (res.data.user.length) {
        errors[name] = value + ' is already taken';
      } else {
        errors[name] = '';
      }
      form.setState({
        errors
      });
    });
  }
}

export function post(data, url) {
  return dispatch => {
    console.log(data);
    return axios.post(`${authenficatedUrl}/${url}`, data);
  }
}


export function get(url, id) {
  return dispatch => {
    console.log(id);
    return axios.get(`${authenficatedUrl}/${url}/${id}`);
  }
}

export function getAll(url) {
  return dispatch => {
    console.log("get all");
    return axios.get(`${authenficatedUrl}/${url}/`);
  }
}


export function del(url, id) {
  return dispatch => {
    console.log(id);
    return axios.delete(`${authenficatedUrl}/${url}/${id}`);
  }
}


export function put(data, url, id) {
  return dispatch => {
    console.log(data + id);
    return axios.put(`${authenficatedUrl}/${url}/${id}`, data);
  }
}
