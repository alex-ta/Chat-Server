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

