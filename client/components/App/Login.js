import React, {
  Component
} from 'react';
import logo from '../Res/Login.png';
import '../Res/Login.css';

import validate from '../../../server/shared/validation';
import {
  connect
} from 'react-redux';
import {
  login
} from '../../actions/authActions';
import classnames from 'classnames';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errors: {},
      isLoading: false
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  isValid() {
    const {
      errors,
      isValid
    } = validate.val(this.state);

    if (!isValid) {
      this.setState({
        errors
      });
    }

    return isValid;
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({
        errors: {},
        isLoading: true
      });
      this.props.login(this.state).then((res) => this.context.router.push('/'), (err) => this.setState({
        errors: err.response.data.errors,
        isLoading: false
      }));
    }
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return ( <
        div className = 'card card-container' >
        <
        img src = {
          logo
        }
        className = 'App-logo'
        alt = 'logo' / >
        <
        p id = 'profile-name'
        className = 'profile-name-card' > < /p> {
          this.state.errors.form && < div className = 'alert alert-danger' > {
              this.state.errors.form
            } < /div>} <
            form className = 'form-signin' >
            <
            div className = {
              classnames('form-group', {
                'has-error': this.state.errors['username']
              })
            } >
            <
            label className = 'control-label' > Username < /label> <
            input type = 'text'
          id = 'username'
          name = 'username'
          className = 'form-control'
          placeholder = 'Username'
          required = ''
          autoFocus = ''
          onChange = {
            this.onChange
          }
          /> {this.state.errors['username'] && <span className='help-block'>{this.state.errors['username']}</span >
        } <
        /div>

        <
        div className = {
          classnames('form-group', {
            'has-error': this.state.errors['password']
          })
        } >
        <
        label className = 'control-label' > Password < /label> <
        input type = 'password'
        id = 'password'
        name = 'password'
        className = 'form-control'
        placeholder = 'Password'
        required = ''
        autoFocus = ''
        onChange = {
          this.onChange
        }
        /> {this.state.errors['password'] && <span className='help-block'>{this.state.errors['password']}</span >
      } <
      /div> <
      button className = 'btn btn-lg btn-primary btn-block btn-signin'
    type = 'submit'
    onClick = {
        this.onSubmit
      } > Sign in < /button> <
      /form>
      </div>
  );
}
}

Login.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default connect(null, {
  login
})(Login);
