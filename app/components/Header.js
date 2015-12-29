import React, { Component } from 'react';
import ReactDOM from 'react-dom';

var Header = (props) => {
  let isLogged = () => {
    if(props.isLogged)
      return <li><a href="#">Log out</a></li>
    else
      return <li><a href="#" onClick={props.navigate.bind(this,'login')}>Log in</a></li>
  }

  let addProduct = () => {
    if(props.isLogged)
      return <li><a href="#">Add addProduct</a></li>
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
            <li><a href="#" onClick={props.navigate.bind(this,'phone')}>Phones <span className="sr-only">(current)</span></a></li>


          </ul>
          <form className="navbar-form navbar-left" role="search">
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Search" />
            </div>
            <button type="submit" className="btn btn-default">Search</button>
          </form>
          <ul className="nav navbar-nav navbar-right">
            {addProduct()}
            {isLogged()}
          </ul>
        </div>
      </div>
    </nav>
  );

}

export default Header;

