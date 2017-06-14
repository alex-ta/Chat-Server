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
	  successFunction: props.successFunction,
	  signFunction: props.signFunction,
      blurdata: {},
	  errors: {}
    }
	this.init(props);
  }
  
  init(props){
	if(!this.state.successRedirect){
		this.state.successRedirect = "";
	}
	if(!this.state.successFunction){
		const that = this;
		// move out of this class
		this.state.successFunction = function(){
			that.context.router.push(that.state.successRedirect);
		};
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
  
  componentWillReceiveProps(nextProps){
	  console.log(nextProps);
	  this.setState({
	  	  fields: nextProps.fields,
		  buttonText: nextProps.buttonText,
		  successRedirect: nextProps.successRedirect,
		  successFunction: nextProps.successFunction,
		  signFunction: nextProps.signFunction,
	  })
	  this.init(nextProps);
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
      this.state.signFunction({data:formdata, target:this.state.buttonText}).then(
        (suc) => {this.state.successFunction();},
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
			  {this.state.buttonText}
          </button>
        </div>
      </form>
    );
  } 
}

Form.propTypes = {
	fields: PropTypes.array.isRequired,
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
