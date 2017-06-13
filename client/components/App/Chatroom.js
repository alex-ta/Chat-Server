import React, { Component } from 'react';
import { connect } from 'react-redux';
import { senden } from '../../actions/chatActions';
import classnames from 'classnames';
import PropTypes from 'prop-types';

class Chatroom extends Component {
  
  constructor(props) {
	super(props);
	this.state = {
		user: this.props.auth.user,
		message: '',
		chatHist: [],
		mapDate: this.mapDate,
		socket: this.props.socket,
		roomName: this.props.roomName
	}
	console.log("props");
	console.log(this.state.roomName);
    this.onSend = this.onSend.bind(this);
	this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps){
	  if(this.state.roomName != nextProps.rootName){
		this.state.chatHist = [];
		this.setState({"roomName":nextProps.roomName});
	  }
  }
  
  
  mapDate(date){
	return (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
  }

  
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  

  onSend(e) {
	e.preventDefault();
	const socket = this.state.socket;
	const data = {};
	data.username = this.state.user.username;
	data.message = this.state.message;
	data.date = new Date();
	data.chatroom = this.state.roomName;
	// wrong chatroom misses 
	//data.chatroom = "new room";
	console.log(data);
	socket.emit('chat', data);
  }
  
  componentDidMount() {
	  const that = this;
      that.state.socket.on('chat', function (data) {
		that.setState({ 
			chatHist: that.state.chatHist.concat([data])
		});
      });
  }
	
  render() {
	  const props = this.props;
	  const state = this.state;
		return (
		<div>
			<div className="content">
				{
					state.chatHist.map((data, index) => {
						return <p key={index}>{"[" + state.mapDate(new Date(data.date)) +"] " + data.username + ": " + data.message }</p>
					})
				}
			</div>
			<div>
				<input id="message" name="message" type="text" placeholder="schreibe etwas..." onChange={this.onChange} />
				<input id="senden" type="submit" onClick={this.onSend} value="senden" />
			</div>
		</div>
		);
  }
}

Chatroom.PropTypes = {
  socket: PropTypes.object.isRequired,
  roomName: PropTypes.string.isRequired
}

Chatroom.contextTypes = {
  router: React.PropTypes.object.isRequired
}


function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, { senden })(Chatroom);