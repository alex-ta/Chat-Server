import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import Chatroom from './Chatroom';
import PropTypes from 'prop-types';

class Home extends Component {
  
  constructor(props) {
	super(props);
	const chatrooms = ["Room_1","Room_2","Room_3"];
	
	this.state = {
      socket: {},
	  user: this.props.auth.user,
	  chatrooms: chatrooms,
	  chatroom: chatrooms[0]
	};
	this.onClick = this.onClick.bind(this);
  }

  componentWillMount() {
	  const socket = io.connect('',{query: 'username='+this.state.user.username});
	  this.setState({"socket":socket});
  }
  
  onClick (e){
	e.preventDefault();
	this.setState({"chatroom":e.target.name});
  }
  
  
  render() {
	  const state = this.state;
	  const onClick = this.onClick;
	  return (
		<div className="chatcontainer row">
			<div className="col-sm-8 col-md-9 sidebar">
				<Chatroom socket={state.socket} roomName="chatroom" ></Chatroom>
			</div>
			<div className="col-sm-4 col-md-3 sidebar">
				<div className="list-group">
					<span href="#" className="list-group-item active">
						Submenu
						<span className="pull-right" id="slide-submenu">
							<i className="fa fa-times"></i>
						</span>
					</span>
					{
						state.chatrooms.map((roomName, count) => {
							return (
							<button onClick={onClick} name={roomName} id={roomName} key={count} className="list-group-item">
								{roomName}
							</button>)})
					}
				</div>
				</div>
			</div>
		);
	}
}

Chatroom.PropTypes = {
  chatrooms: PropTypes.array.isRequired
}


function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, { })(Home);

