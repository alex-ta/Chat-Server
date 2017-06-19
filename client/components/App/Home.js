import React, {Component} from 'react';
import classnames from 'classnames';
import {connect} from 'react-redux';
import Chatroom from './Chatroom';
import Sidepanel from './Sidepanel';
import PropTypes from 'prop-types';
import '../Res/home.css';

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      socket: {},
      user: this.props.auth.user,
      chatroom: ""
    };

    this.onClick = this.onClick.bind(this);
	this.getRoomHistory = this.getRoomHistory.bind(this);
  }
  
  getRoomHistory(room){
	 let currenHist = this.state[room];
	  if(!currenHist){
		  currenHist = [];
	  }
	  return currenHist;
  }

  componentWillMount() {
    const socket = io.connect('', {
      query: 'username=' + this.state.user.username
    });
	
	const that = this;
    socket.on('chat', function(data) {  
      that.setState({
        [data.chatroom]: that.getRoomHistory(data.chatroom).concat([data])
      });
    });
	this.setState({socket:socket});
  }

  onClick(e) {
    e.preventDefault();
    this.setState({'chatroom': e.target.name});
  }

  render() {
    const state = this.state;
    const onClick = this.onClick;
    const room = state.chatroom;
	const roomHist = this.getRoomHistory(room);
    return (
      <div className='chatcontainer row'>
        <div className='col-sm-8 col-md-9 sidebar'>
          {room
            ? <Chatroom socket={state.socket} roomName={room} roomHist={roomHist}></Chatroom>
            : <p id="selectChat">Select or create a Chatroom </p>
}
        </div>
        <Sidepanel onClick={onClick}/>
      </div>
    );
  }
}

Chatroom.PropTypes = {
  chatrooms: PropTypes.array.isRequired
}

function mapStateToProps(state) {
  return {auth: state.auth};
}

export default connect(mapStateToProps, {} )(Home);
