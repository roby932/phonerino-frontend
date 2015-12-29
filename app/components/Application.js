import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import Login from '../containers/LoginContainer';

var Application = (props) => {
  let renderActive = () => {
    if(props.page === 'login'){
      return <Login />;
    } else {
      return <p>On: {props.page}</p>;
    }
  }

  return (
    <div>
      <Header page={props.page} navigate={props.actions.navigateTo} />
      {renderActive()}
    </div>
  );
}

export default Application;

