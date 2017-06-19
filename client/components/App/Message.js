import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import '../Res/message.css';

class Message extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: props.data,
      user: props.user
    };
  }

  mapDate(date) {
    return (date.getHours() < 10
      ? '0' + date.getHours()
      : date.getHours()) + ':' + (date.getMinutes() < 10
      ? '0' + date.getMinutes()
      : date.getMinutes());
  }

  render() {
    const mapDate = this.mapDate
    const data = this.state.data;
    const isUser = this.state.user.username == this.state.data.username;

    return (
      <li className={isUser
        ? 'left clearfix'
        : 'right clearfix'}>
        <span className={isUser
          ? 'chat-img pull-right'
          : 'chat-img pull-left'}>
          <img src={data.image} alt='User Avatar' className='img-square'/>
        </span>
        <div className='chat-body clearfix'>
          {isUser
            ? <div className='header'>
                <small className=' text-muted'>
                  <span className='glyphicon glyphicon-time'></span>{mapDate(new Date(data.date))}</small>
                <strong className='pull-right primary-font'>{data.username}</strong>
              </div>
            : <div className='header'>
              <strong className='primary-font'>{data.username}</strong>
              <small className='pull-right text-muted'>
                <span className='glyphicon glyphicon-time'></span>{mapDate(new Date(data.date))}</small>
            </div>}
          <p>
            {data.message}
          </p>
        </div>
      </li>
    );
  }
}

Message.propTypes = {
  data: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

export default Message;
