import React, { Component } from 'react';
import { connect } from 'react-redux';
import { senden } from '../../actions/chatActions';
import classnames from 'classnames';

class Home extends Component {
  
  constructor(props) {
	super(props);
	this.state = {
		username: '',
		message: '',
		chatHist: [],
		mapDate: this.mapDate
	}
    this.onSend = this.onSend.bind(this);
	this.onChange = this.onChange.bind(this);
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
	console.log(this.props.auth);
	data.username = this.props.auth.user;
	data.message = this.state.message;
	data.date = new Date();
	data.chatroom = "chatroom";
	socket.emit('chat', data);
  }
  
  componentDidMount() {
	  const socket = io.connect();
	  this.setState({"socket":socket});
	  const that = this;
      socket.on('chat', function (data) {
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


Home.contextTypes = {
  router: React.PropTypes.object.isRequired
}


function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, { senden })(Home);
