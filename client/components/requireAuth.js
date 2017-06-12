import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


export default function(ComposedComponent) {
  class Authenticate extends React.Component {
    componentWillMount() {
      if (!this.props.isAuthenticated) {
        this.context.router.push('/login');
      }
    }

	
    componentWillUpdate(nextProps) {
	  // prevent endless loop 2 arg && nextProps.location.pathname != '/login'
	  if (!nextProps.isAuthenticated) {
		  this.context.router.push('/login');
	  }
    }

    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  Authenticate.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
  }

  Authenticate.contextTypes = {
    router: PropTypes.object.isRequired
  }

  function mapStateToProps(state) {
	console.log(state.auth);
    return {
      isAuthenticated: state.auth.isAuthenticated
    };
  }

  return connect(mapStateToProps)(Authenticate);
}
