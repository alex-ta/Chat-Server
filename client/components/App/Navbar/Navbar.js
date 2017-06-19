import React from 'react';
import NavLink from './NavLink';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {logout} from '../../../actions/authActions';
import '../../Res/navbar.css';

class Navbar extends React.Component {

  logout(e) {
    e.preventDefault();
    this.props.logout();
  }

  render() {

    const {isAuthenticated} = this.props.auth;

    const userLinks = (
      <div>
        <ul className='nav navbar-nav navbar-default'>
          <NavLink to='/'>
            <span className='glyphicon glyphicon-home'></span>
            Home
          </NavLink>
          <NavLink to='/api'>
            <span className='glyphicon glyphicon-comment'></span>
            Chatrooms
          </NavLink>
        </ul>
        <ul className='nav navbar-nav navbar-right'>
          <li>
            <Link to='' onClick={this.logout.bind(this)}>
              <span className='glyphicon glyphicon-off'></span>
              Logout
            </Link>
          </li>
        </ul>
      </div>
    );

    const guestLinks = (
      <ul className='nav navbar-nav navbar-right'>
        <NavLink to='/signup'>
          <span className='glyphicon glyphicon-pencil'></span>
          Sign Up</NavLink>
        <NavLink to='/login'>
          <span className='glyphicon glyphicon-log-in'></span>
          Login</NavLink>
      </ul>
    );

    return (
      <nav className='navbar navbar-default'>
        <div className='container-fluid'>
          <div className='navbar-header'>
            <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='#myNavbar'>
              <span className='icon-bar'></span>
              <span className='icon-bar'></span>
              <span className='icon-bar'></span>
            </button>
            <Link to='/' className='navbar-brand'>Chat App</Link>
          </div>
          <div className='collapse navbar-collapse'>
            {isAuthenticated
              ? userLinks
              : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {auth: state.auth};
}
export default connect(mapStateToProps, {logout})(Navbar);
