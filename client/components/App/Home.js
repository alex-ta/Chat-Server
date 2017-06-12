import React, { Component } from 'react';
import classnames from 'classnames';
import Chatroom from './Chatroom';

class Home extends Component {
  
  constructor(props) {
	super(props);
	this.state = {
      socket: {}
    };
	
  }

  componentWillMount() {
	  const socket = io.connect();
	  this.setState({"socket":socket});
  }
  
  render() {
	  const state = this.state;
	  return (
		<Chatroom socket={state.socket}></Chatroom>
	);
  }
}


Home.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default Home;

