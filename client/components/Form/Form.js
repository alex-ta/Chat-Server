import React from 'react';
import map from 'lodash/map';
import classnames from 'classnames';
import valid from '../../../server/shared/validation';
import FormGroup from './FormGroup';
import PropTypes from 'prop-types';

class Form extends React.Component {
  constructor(props) {
    super(props);
	
	// Bind Methods to avoid null this references
	this.handelChange = this.handelChange.bind(this);
    this.handelBlur = this.handelBlur.bind(this);
    this.handelSubmit = this.handelSubmit.bind(this);
	
    this.state = {
	  fields: props.fields,
	  buttonText: props.buttonText,
	  successRedirect: props.successRedirect,
	  signFunction: props.signFunction,
      blurdata: {},
	  errors: {}
    }
	
	if(!this.state.successRedirect){
		this.state.successRedirect = "";
	}
	
	// add blur function for every field passed	
	Object.keys(props.blurdata).forEach((field) => {
		this.state.blurdata[field] = this.handelBlur;
	});
	
	// add attributes for form
	props.fields.forEach((field) => {
		if(props[field]){
			this.state[field] = props[field];
		} else {
			this.state[field] = "";
		}
	});
  }
  
  handelChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  
  handelBlur(e){
	const name = e.target.name;
	const value = e.target.value;
	
	if( value !== "" ){
		this.props.blurdata[name](e, this);
	}
  }
  
  handelSubmit(e) {
	e.preventDefault();
	// map data to form
	const formdata = {};
	this.state.fields.forEach((key) => {
		formdata[key] = this.state[key];
	});
	
    const { errors, isValid } = valid.val(formdata);	
    if (isValid) {
      this.setState({ errors: {}, isLoading: true });
      this.state.signFunction(formdata).then(
        (suc) => {this.context.router.push(this.state.successRedirect);},
        (err) => this.setState({ errors: err.response.data, isLoading: false })
      );
	} else {	
	  this.setState({ errors });
    }
  }

  render() {
    const ref = this;
    return (
      <form onSubmit={this.handelSubmit}>
		{
			ref.state.fields.map(function(field, count){
				return (<FormGroup
				  key={count}
				  id={field}
				  error={ref.state.errors[field]}
				  onChange={ref.handelChange}
				  onBlur={ref.state.blurdata[field]}
				  value={ref.state[field]}
				  name={field}
				/>);
			})
		}
        <div className="form-group">
          <button disabled={this.state.invalid} className="btn btn-primary btn-lg">
            Sign up
          </button>
        </div>
      </form>
    );
  } 
}

Form.propTypes = {
	buttonText: PropTypes.string.isRequired,
	successRedirect: PropTypes.string,
	blurdata: PropTypes.object,
	signFunction: PropTypes.func,
	errors: PropTypes.object
}


Form.contextTypes = {
  router: PropTypes.object.isRequired
}

export default Form;
