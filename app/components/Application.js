import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import Login from '../containers/LoginContainer';
import EditUser from '../containers/EditUserContainer';
import AddProduct from '../containers/AddProductContainer';
import Users from './Users';
import Products from './Products';

var Application = (props) => {
  console.log(props);
  let renderActive = () => {
    if(props.page === 'login') {
      return <Login />;
    } else if(props.page === 'editUser') {
      return <EditUser />;
    } else if(props.page === 'add') {
      return <AddProduct />;
    } else if(props.page === 'users'){
      return <Users users={props.users} delete={()=>{}} loading={props.usersLoading} />;
    } else if(props.page === 'phones'){
      return <Products
        phones={props.phones}
        brands={props.brands}
        delete={()=>{}}
        loading={props.phonesLoading}
        setFilter={props.actions.setFilters}
        hasBuyout={props.actions.hasBuyout}
        maxPrice={props.actions.maxPrice}
        orderBy={props.actions.orderBy}/>;
    } else {
      return <p>On: {props.page}</p>;
    }
  }

  return (
    <div>
      <Header
        page={props.page}
        navigate={props.actions.navigateTo}
        isLogged={props.isLogged}
        logout={props.actions.logout}/>
      {renderActive()}
    </div>
  );
}

export default Application;

