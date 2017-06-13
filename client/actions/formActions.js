import axios from 'axios';

export function signUp(userData) {
  return dispatch => {
	console.log(userData);
    return axios.post('/signup', userData);
  }
}

export function exists(e, form) {
  return dispatch => {
	const name = e.target.name;
	const value = e.target.value;
	return axios.get(`/exists/${value}`).then(res => {
	  let errors = form.state.errors;
  	  if (res.data.user.length) {
	    errors[name] = value + ' is already taken';
	  } else {
	    errors[name] = '';
	  }
	  form.setState({ errors });
    });
  }
}

export function post(data, url) {
  return dispatch => {
	console.log(data);
    return axios.post('/auth/' + url, data);
  }
}


export function get(url, id) {
  return dispatch => {
	console.log(id);
    return axios.get(`/auth/${url}/${id}`);
  }
}

export function getAll(url) {
  return dispatch => {
	console.log("get all");
    return axios.get(`/auth/${url}/`);
  }
}


export function del(url, id) {
  return dispatch => {
	console.log(id);
    return axios.delete(`/auth/${url}/${id}`);
  }
}


export function put(data, url, id) {
  return dispatch => {
	console.log(data + id);
    return axios.put(`/auth/${url}/${id}`, data);
  }
}
