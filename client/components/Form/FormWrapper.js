import React from 'react';
import PropTypes from 'prop-types';
import Form from './Form';
import { connect } from 'react-redux';
import { userSignupRequest } from '../../actions/signupActions';
import { addFlashMessage } from '../../actions/flashMessages.js';

class FormWrapper extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
	  formdata: props.formdata,
    }
  }	
	
  render() {
    const { userSignupRequest, addFlashMessage} = this.props;
    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <Form
            userSignupRequest = {userSignupRequest}
            addFlashMessage = {addFlashMessage} 
			formdata = {formdata}
			/>
        </div>
      </div>
    );
  }
}

FormWrapper.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  formdata: PropTypes.object.isRequired
}

export default connect(null, { userSignupRequest, addFlashMessage })(FormWrapper);
