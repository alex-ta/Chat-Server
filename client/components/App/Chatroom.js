import React, { Component } from 'react';
import { connect } from 'react-redux';
import { senden } from '../../actions/chatActions';
import classnames from 'classnames';
import PropTypes from 'prop-types';

class Chatroom extends Component {
  
  constructor(props) {
	super(props);
	const roomHist = this.props.roomName + "_hist";
	
	this.state = {
		user: this.props.auth.user,
		message: '',
		mapDate: this.mapDate,
		socket: this.props.socket,
		roomName: this.props.roomName,
		[roomHist]: []
	}
    this.onSend = this.onSend.bind(this);
	this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps){
	  if(this.state.roomName != nextProps.roomName){
		const roomHist = nextProps.roomName + "_hist";
		if(this.state[roomHist]){
			console.log("room defined" + console.log(this.state[roomHist]));
			this.setState({"roomName":nextProps.roomName});
		} else {
			console.log("room undefined")
			this.setState({"roomName":nextProps.roomName,
						  [roomHist]: []});
						
		}
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
	  console.log("component did mount with "+this.state.roomName);
	  const that = this;
	  this.state.socket.on('chat', function (data) {
	    const roomHist = that.state.roomName + "_hist";
		that.setState({ 
			[roomHist] : that.state[roomHist].concat([data])
		});
      });
  }
	
  render() {
	  const props = this.props;
	  const state = this.state;
	  const roomHist = this.state.roomName + "_hist";
	  console.log(state);
	  return (
		<div>
			<div className="content">
				{
					state[roomHist].map((data, index) => {
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