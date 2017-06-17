import React from 'react';
import NavLink from './NavLink';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {logout} from '../../../actions/authActions';

class Navbar extends React.Component {

  logout(e) {
    e.preventDefault();
    this.props.logout();
  }

  render() {

    const {isAuthenticated} = this.props.auth;

    const userLinks = (
      <div>
        <ul className="nav navbar-nav navbar-default">
          <NavLink to="/">
            Home
          </NavLink>
          <NavLink to="/api">
            Chatrooms
          </NavLink>
        </ul>
        <ul className="nav navbar-nav navbar-right">
          <li>
            <Link to="" onClick={this.logout.bind(this)}>Logout</Link>
          </li>
        </ul>
      </div>
    );

    const guestLinks = (
      <ul className="nav navbar-nav navbar-right">
        <NavLink to="/signup">Sign Up</NavLink>
        <NavLink to="/login">Login</NavLink>
      </ul>
    );

    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">Chat App</Link>
          </div>
          <div className="collapse navbar-collapse">
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
