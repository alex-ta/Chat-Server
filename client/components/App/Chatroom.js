import React, {Component} from 'react';
import {connect} from 'react-redux';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Message from './Message';
import '../Res/chatroom.css';

class Chatroom extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user: this.props.auth.user,
      message: '',
      mapDate: this.mapDate,
      socket: this.props.socket,
      roomName: this.props.roomName,
      roomHist: this.props.roomHist
    }
    this.onSend = this.onSend.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({'roomName': nextProps.roomName, 'roomHist': nextProps.roomHist});
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSend(e) {
    e.preventDefault();
    const socket = this.state.socket;
    const data = {};
    data.username = this.state.user.username;
    data.image = this.state.user.image;
    data.message = this.state.message;
    data.date = new Date();
    data.chatroom = this.state.roomName;
    socket.emit('chat', data);
  }

  render() {
    const props = this.props;
    const state = this.state;
    console.log(state);
    return (
      <div>
        <div className='chat-panel'>
          <ul className='chat'>
            <div className='content'>
              {state.roomHist.map((data, index) => {
                console.log(data);
                return <Message key={this.state.roomName + index} data={data} user={state.user}/>
              })}
            </div>
          </ul>
        </div>
        <div className='panel-footer'>
          <form onSubmit={this.onSend} className='input-group'>
            <input id='message' name='message' type='text' className='form-control input-sm' placeholder='Type your message here...' onChange={this.onChange}/>
            <span className='input-group-btn'>
              <input className='btn btn-warning btn-sm' id='senden' type='submit' value='senden'/>
            </span>
          </form>
        </div>
      </div>
    );
  }
}

Chatroom.PropTypes = {
  socket: PropTypes.object.isRequired,
  roomName: PropTypes.string.isRequired,
  roomHist: PropTypes.string.isRequired
}

Chatroom.contextTypes = {
  router: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {auth: state.auth};
}

export default connect(mapStateToProps, {})(Chatroom);
