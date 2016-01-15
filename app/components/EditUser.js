import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import { retrieveLocalUser } from '../utils';

class EditUser extends Component {
  constructor(props) {
    super(props);
    let user = retrieveLocalUser();
    console.log('render',props,user.body);
    this.state = {
      user: user.body
    }
  }

  render() {
    if(this.props.loading){
      return (<div>loading</div>);
    }
    return (
      <div className="col-md-12">
        <div className="col-md-6 col-md-offset-3">
          <div className="panel panel-default">
            <div className="panel-heading">Edit</div>
            <div className="panel-body">
              <form onSubmit={this.signUp.bind(this)}>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">First Name</label>
                  <input ref={(ref) => this.firstName = ref} required defaultValue={this.props.user.first_name}
                    type="text" className="form-control" id="exampleInputEmail1" placeholder="Name" />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Last Name</label>
                  <input ref={(ref) => this.lastName = ref} required defaultValue={this.props.user.last_name}
                    type="text" className="form-control" id="exampleInputEmail1" placeholder="Name" />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Email address</label>
                  <input ref={(ref) => this.email = ref} required defaultValue={this.props.user.email}
                    type="email" className="form-control" id="exampleInputEmail1" placeholder="Email" />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Password</label>
                  <input ref={(ref) => this.password = ref} required defaultValue={this.props.user.password}
                    type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-default">edit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  signUp(e) {
    e.preventDefault();
    this.props.actions.edit(this.state.user.id,{
      data: {
        first_name: this.firstName.value,
        last_name: this.lastName.value,
        email: this.email.value,
        password: this.password.value,
      }
    });
    console.log('sign up');
  }
}

export default EditUser;

