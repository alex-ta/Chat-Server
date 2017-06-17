import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Api from './Api';
import PropTypes from 'prop-types';

class ChatroomApi extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (<Api url="chatroom"/>);
  }

}

export default ChatroomApi;
