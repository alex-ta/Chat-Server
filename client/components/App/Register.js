import React, {Component} from 'react';
import {connect} from 'react-redux';
import Form from '../Form/Form'
import {signUp, exists} from '../../actions/formActions';
import PropTypes from 'prop-types'

class Register extends React.Component {
  render() {
    const {signUp, exists} = this.props;
    return (
      <div className='row'>
        <div className='col-md-4 col-md-offset-4'>
          <Form fields={['username', 'password', 'passwordConfirm']} buttonText='Sign Up' signFunction={signUp} blurdata={{
            'username': exists
          }}/>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  signUp: PropTypes.func.isRequired,
  exists: PropTypes.func.isRequired
}

export default connect(null, {signUp, exists})(Register);
