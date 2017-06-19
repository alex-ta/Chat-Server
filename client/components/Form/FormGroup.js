import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

function setType(key) {
  let type = 'text';
  if (key.indexOf('email') > -1) {
    type = 'email';
  }
  if (key.indexOf('password') > -1) {
    type = 'password';
  }
  return type;
}

const FormGroup = ({
  name,
  value,
  label,
  type,
  error,
  onChange,
  onBlur
}) => {

  if (!label) {
    label = name;
  }
  if (!type) {
    type = setType(name);
  }
  return (
    <div className={classnames('form-group', {'has-error': error})}>
      <label className='control-label'>{name.toUpperCase()}</label>
      <input onChange={onChange} onBlur={onBlur} value={value} type={type} name={name} className='form-control'/> {error && <span className='help-block'>{error}</span>}
    </div>
  );
}

FormGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func
}

export default FormGroup;
