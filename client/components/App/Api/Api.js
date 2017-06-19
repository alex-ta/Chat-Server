import React, {Component} from 'react';
import classnames from 'classnames';
import {post, get, getAll, del, put} from '../../../actions/formActions';
import {connect} from 'react-redux';
import ReactDOM from 'react-dom';
import Form from '../../Form/Form';
import PropTypes from 'prop-types';

class Api extends Component {

  constructor(props) {
    super(props);

    this.state = {
      collection: [],
      objKeys: [],
      editData: {},
      editId: '',
      buttonText: 'Create',
      url: props.url
    };

    this.updateCollection();

    this.props.get(this.state.url, undefined).then((res) => {
      this.setState({'objKeys': res.data});
    });

    this.onClick = this.onClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.updateCollection = this.updateCollection.bind(this);
  }

  updateCollection() {
    this.props.getAll(this.state.url).then((res) => {
      this.setState({'collection': res.data});
    });
  }

  onClick(e) {
    e.preventDefault();
    switch (e.target.name) {
      case 'delete':
        console.log('delete');
        this.props.del(this.state.url, e.target.value);
        this.updateCollection();
        break;
      case 'edit':
        console.log('edit');
        const that = this;
        const id = e.target.value;
        console.log(id);
        this.props.get(this.state.url, id).then((res) => {
          this.setState({'editData': res.data, 'buttonText': 'Edit', 'editId': id});
          const element = ReactDOM.findDOMNode(that.refs.data_dialog);
          $(element).modal('show');
        });
        break;
      case 'create':
        this.setState({'editData': {}, 'buttonText': 'Create'});
        const element = ReactDOM.findDOMNode(this.refs.data_dialog);
        $(element).modal('show');
        break;
      default:
        console.log(e.target);
    }
  }

  onSubmit(formdata) {
    const element = ReactDOM.findDOMNode(this.refs.data_dialog);
    $(element).modal('hide');
    switch (formdata.target.toLowerCase()) {
      case 'edit':
        return this.props.put(formdata.data, this.state.url, this.state.editId);
      case 'create':
        return this.props.post(formdata.data, this.state.url);
    }
  }

  render() {
    const state = this.state;
    const onClick = this.onClick;
    const onSubmit = this.onSubmit;
    const post = this.props.post;
    const update = this.updateCollection;
    const opts = this.state.editData;
    opts.buttonText = this.state.buttonText;
    return (
      <div className='data row'>

        <div className='col-sm-10 col-md-10 sidebar'></div>
        <div className='col-sm-2 col-md-2 sidebar'>
          <button onClick={onClick} name='create' id='create' value='create' className='list-group-item'>Create</button>
        </div>

        <div className='modal fade' ref='data_dialog' id='data_dialog' role='dialog'>
          <div className='modal-dialog modal-lg'>
            <div className='modal-content'>
              <div className='modal-header'>
                <button type='button' className='close' data-dismiss='modal'>&times;</button>
                <h4 className='modal-title'>Modal Header</h4>
              </div>
              <div className='modal-body'>
                {(state.objKeys.length > 0)
                  ? <Form fields={state.objKeys} blurdata={{}} signFunction={onSubmit} successFunction={update} {...opts}/>
                  : <div className='noFieldsFound'/>}
              </div>
              <div className='modal-footer'>
                <button type='button' className='btn btn-default' data-dismiss='modal'>Close</button>
              </div>
            </div>
          </div>
        </div>

        {state.collection.map((data, count) => {
          return (
            <div key={count}>
              <div className='col-sm-8 col-md-8 sidebar'>
                <h4>
                  {data.name}
                </h4>
              </div>
              <div className='col-sm-2 col-md-2 sidebar'>
                <button onClick={onClick} name='edit' id={data.name} value={data._id} className='list-group-item'>
                  Edit</button>
              </div>
              <div className='col-sm-2 col-md-2 sidebar'>
                <button onClick={onClick} name='delete' id={data.name} value={data._id} className='list-group-item'>
                  Delete</button>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

Api.PropTypes = {
  url: PropTypes.string.required
}

function mapStateToProps(state) {
  return {auth: state.auth};
}

export default connect(mapStateToProps, {post, get, getAll, del, put})(Api);
