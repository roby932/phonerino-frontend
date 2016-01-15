import React, { Component } from 'react';
import ReactDOM from 'react-dom';

var Header = (props) => {
  console.log(props)
  let isLogged = () => {
    if(props.isLogged)
      return <li><a href="#" onClick={props.logout}>Log out</a></li>
    else
      return <li><a href="#" onClick={props.navigate.bind(this,'login')}>Log in</a></li>
  }

  let addProduct = () => {
    if(props.isLogged)
      return <li><a href="#" onClick={props.navigate.bind(this,'add')}>Add Product</a></li>
  }

  let editUser = () => {
    if(props.isLogged)
      return <li><a href="#" onClick={props.navigate.bind(this,'editUser')}>Edit user</a></li>
  }

  return (
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="#" onClick={props.navigate.bind(this,'home')}>Home</a>
        </div>

        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav">
            <li><a href="#" onClick={props.navigate.bind(this,'phones')}>Phones <span className="sr-only">(current)</span></a></li>
            <li><a href="#" onClick={props.navigate.bind(this,'users')}>Users <span className="sr-only">(current)</span></a></li>

          </ul>

          <ul className="nav navbar-nav navbar-right">
            {editUser()}
            {addProduct()}
            {isLogged()}
          </ul>
        </div>
      </div>
    </nav>
  );

}

export default Header;

