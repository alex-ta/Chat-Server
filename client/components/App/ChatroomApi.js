import React, { Component } from 'react';
import classnames from 'classnames';
import { post, get, getAll, del, put  } from '../../actions/formActions';
import { connect } from 'react-redux';
import Chatroom from './Chatroom';
import Form from '../Form/Form';
import PropTypes from 'prop-types';

class ChatroomApi extends Component {
  
  constructor(props) {
	super(props);
	
	this.state = {
		collection:[],
		emptyObj:{},
		url:"/chatroom/"
		};
	this.onClick = this.onClick.bind(this);
  }

  componentWillMount() {
	  const that = this;
	  
	  this.props.getAll(that.state.url).then((res) => {
		this.setState({"collection":res.data});
	  });
	  
	  this.props.get(that.state.url, undefined).then((res) => {
		console.log(res.data);
		this.setState({"emptyObj":res.data});  
	  });
	  
  }
  
  onClick (e){
	e.preventDefault();
  }
  
  
  render() {
	  const state = this.state;
	  const onClick = this.onClick;
	  const roomName = "some";
	  return (
		<div className="data row">
		
			<div className="col-sm-10 col-md-10 sidebar">
			</div>
			<div className="col-sm-2 col-md-2 sidebar">
				<button type="button" className="list-group-item" data-toggle="modal" data-target="#myModal">Create</button>
			</div>
  
			  <div className="modal fade" id="myModal" role="dialog">
				<div className="modal-dialog modal-lg">
				  <div className="modal-content">
					<div className="modal-header">
					  <button type="button" className="close" data-dismiss="modal">&times;</button>
					  <h4 className="modal-title">Modal Header</h4>
					</div>
					<div className="modal-body">
					
					
					
					</div>
					<div className="modal-footer">
					  <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
					</div>
				  </div>
				</div>
			  </div>
			
		
		
		
			<div className="col-sm-8 col-md-8 sidebar">
				<h4> Data </h4>
			</div>
			<div className="col-sm-2 col-md-2 sidebar">
				<button onClick={onClick} name={roomName} id={roomName} className="list-group-item">
				Edit</button>
			</div>
			<div className="col-sm-2 col-md-2 sidebar">
				<button onClick={onClick} name={roomName} id={roomName} className="list-group-item">
				Delete</button>
			</div>
		</div>
		);
	}
}

ChatroomApi.PropTypes = {
  chatrooms: PropTypes.array.isRequired
}


function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, { post, get, getAll, del, put })(ChatroomApi);

