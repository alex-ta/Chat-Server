import React, {Component} from 'react';
import classnames from 'classnames';
import {connect} from 'react-redux';
import Chatroom from './Chatroom';
import PropTypes from 'prop-types';

import {getAll} from '../../actions/formActions';

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      socket: {},
      user: this.props.auth.user,
      chatrooms: [],
      chatroom: ''
    };

    this.props.getAll('chatroom').then((res) => {
      const chatrooms = [];
      res.data.forEach((room) => {
        chatrooms.push(room.name);
      });
      this.setState({'chatrooms': chatrooms});
    });

    this.onClick = this.onClick.bind(this);
  }

  componentWillMount() {
    const socket = io.connect('', {
      query: 'username=' + this.state.user.username
    });
    this.setState({'socket': socket});
  }

  onClick(e) {
    e.preventDefault();
    this.setState({'chatroom': e.target.name});
  }

  render() {
    const state = this.state;
    const onClick = this.onClick;
    const room = state.chatroom;
    return (
      <div className='chatcontainer row'>
        <div className='col-sm-8 col-md-9 sidebar'>
          {room
            ? <Chatroom socket={state.socket} roomName={room}></Chatroom>
            : <p>Select a Chat
            </p>
}
        </div>
        <div className='col-sm-4 col-md-3 sidebar'>
          <div className='list-group'>
            <span href='#' className='list-group-item active'>
              Submenu
              <span className='pull-right' id='slide-submenu'>
                <i className='fa fa-times'></i>
              </span>
            </span>
            {state.chatrooms.map((roomName, count) => {
              console.log(roomName);
              return (
                <button onClick={onClick} name={roomName} id={roomName} key={count} className='list-group-item'>
                  {roomName}
                </button>
              )
            })
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
  return {auth: state.auth};
}

export default connect(mapStateToProps, {getAll})(Home);
