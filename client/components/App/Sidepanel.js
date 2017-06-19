import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import '../Res/home.css';
import {getAll} from '../../actions/formActions';

class Sidepanel extends Component {

  constructor(props) {
    super(props);

    this.state = {
      chatrooms: [],
      onClick: props.onClick
    };

    this.props.getAll('chatroom').then((res) => {
      const chatrooms = [];
      res.data.forEach((room) => {
        chatrooms.push(room.name);
      });
      this.setState({'chatrooms': chatrooms});
    });
  }

  render() {
    const state = this.state;
    const onClick = this.state.onClick;
    const room = state.chatroom;
    return (
      <div className='col-sm-4 col-md-3 sidebar'>
        <div className='list-group'>
          <span href='#' className='list-group-item' id='ChatHeader'>
            Available Chatrooms
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
          })}
        </div>
      </div>
    );
  }
}

Sidepanel.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default connect(null, {getAll})(Sidepanel);
