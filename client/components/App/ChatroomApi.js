import React, { Component } from 'react';
import classnames from 'classnames';
import { post, get, getAll, del, put  } from '../../actions/formActions';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import Chatroom from './Chatroom';
import Form from '../Form/Form';
import PropTypes from 'prop-types';

class ChatroomApi extends Component {
  
  constructor(props) {
	super(props);
	
	this.state = {
		collection:[],
		objKeys:[],
		url:"chatroom"
		};
	
	const that = this;
	  
	this.props.getAll(that.state.url).then((res) => {
	  this.setState({"collection":res.data});
	});
	
	this.props.get(that.state.url, undefined).then((res) => {
	  this.setState({"objKeys":res.data});  
	});
	
	this.onClick = this.onClick.bind(this);
	this.onSubmit = this.onSubmit.bind(this);
  }

  onClick (e){
	e.preventDefault();
  }
  
  onSubmit (e){
	console.log(e);
	const element = ReactDOM.findDOMNode(this.refs.myModal);
	$(element).modal('hide');
	return this.props.post(e, "chatroom");
  }
  
  
  render() {
	  const state = this.state;
	  const onClick = this.onClick;
	  const onSubmit = this.onSubmit;
	  const post = this.props.post;
	  const roomName = "some";
	  
	  return (
		<div className="data row">
		
			<div className="col-sm-10 col-md-10 sidebar">
			</div>
			<div className="col-sm-2 col-md-2 sidebar">
				<button type="button" className="list-group-item" data-toggle="modal" data-target="#myModal">Create</button>
			</div>
  
			  <div className="modal fade" ref="myModal" id="myModal" role="dialog">
				<div className="modal-dialog modal-lg">
				  <div className="modal-content">
					<div className="modal-header">
					  <button type="button" className="close" data-dismiss="modal">&times;</button>
					  <h4 className="modal-title">Modal Header</h4>
					</div>
					<div className="modal-body">
					{
						(state.objKeys.length > 0) ? 
							<Form
								fields = {state.objKeys}
								buttonText = "Create"
								blurdata = {{}}
								signFunction = {onSubmit}
							/> : <div className="noFieldsFound" />
					}
					</div>
					<div className="modal-footer">
					  <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
					</div>
				  </div>
				</div>
			  </div>
			
		
		
			{
				state.collection.map((data, count) => { 
					return(
						<div key={count}>
							<div className="col-sm-8 col-md-8 sidebar">
								<h4> {data.name} </h4>
							</div>
							<div className="col-sm-2 col-md-2 sidebar">
								<button onClick={onClick} name={data.name} id={data.name} className="list-group-item">
								Edit</button>
							</div>
							<div className="col-sm-2 col-md-2 sidebar">
								<button onClick={onClick} name={data.name} id={data.name} className="list-group-item">
								Delete</button>
							</div>
						</div>);			
				})
			}
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

