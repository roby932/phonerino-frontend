import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {

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
            <div className="panel-heading">Login</div>
            <div className="panel-body">
              <form onSubmit={this.login.bind(this)}>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Email address</label>
                  <input ref={(ref) => this.loginEmail = ref} required
                    type="email" className="form-control" id="exampleInputEmail1" placeholder="Email" />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Password</label>
                  <input ref={(ref) => this.loginPassword = ref} required
                    type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-default">Login</button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-md-offset-3">
          <div className="panel panel-default">
            <div className="panel-heading">Sign up</div>
            <div className="panel-body">
              <form onSubmit={this.signUp.bind(this)}>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">First Name</label>
                  <input ref={(ref) => this.firstName = ref} required
                    type="text" className="form-control" id="exampleInputEmail1" placeholder="Name" />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Last Name</label>
                  <input ref={(ref) => this.lastName = ref} required
                    type="text" className="form-control" id="exampleInputEmail1" placeholder="Name" />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Email address</label>
                  <input ref={(ref) => this.email = ref} required
                    type="email" className="form-control" id="exampleInputEmail1" placeholder="Email" />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Password</label>
                  <input ref={(ref) => this.password = ref} required
                    type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-default">Sign up</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  login(e) {
    e.preventDefault();
    this.props.actions.login('user')
    console.log('log in',this.loginPassword.value,this.loginEmail.value);
  }

  signUp(e) {
    e.preventDefault();
    this.props.actions.login('user',{
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

export default Login;

