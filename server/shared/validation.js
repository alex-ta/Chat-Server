const Validator = require('validator');
const isEmpty = require('lodash/isEmpty');

/**
Test validation
*/

function validateObject(obj) {
  const keys = Object.keys(obj);
  const pwds = [];
  const errors = {};

  keys.forEach((key) => {
    // continue over wrong input my handle number
    if (typeof obj[key] != 'string' | 'number') {
      return
    }
    const props = {};
    props.email = (key.toLowerCase().indexOf('email') > -1);
    props.isNull = true;
    props.minLength = 0;
    props.maxLength = 200;
    validate(key, obj[key], props, errors);
    if (key.toLowerCase().indexOf('password') > -1) {
      pwds.push(key);
    }
  });
  // normally run to whole array
  if ((pwds.length > 1) && !Validator.equals(obj[pwds[0]], obj[pwds[1]])) {
    errors[pwds[0]] = 'passwords must match';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

function validate(key, val, props, errors) {

  if (props.email) {
    if (!Validator.isEmail(val)) {
      errors[key] = 'email is invalid';
    }
  }

  if (props.isNull) {
    if (Validator.isNull(val)) {
      errors[key] = 'this filed is required';
    }
  }

  /*
  if(props.minLength){
  	if (Validator.minLen(val, props.minLength)) {
  		errors[key] = 'you require ' + props.maxLength + ' characters';
  	}
  }

  if(props.maxLength){
  	if (Validator.maxLen(val, props.maxLength)) {
  		errors[key] = 'you exeeded '+props.maxLength+' characters';
  	}
  }
  */
  return errors;
}

module.exports = {
  'val': validateObject
};
