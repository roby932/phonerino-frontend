import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { retrieveLocalUser } from '../utils';
import moment from 'moment';

class Users extends Component {

  render() {
    console.log(this.props)
    if(this.props.loading){
      return (<div>loading</div>);
    }
    return (
      <div className="col-md-12">
        <div className="col-md-8 col-md-offset-2 table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>id</th>
                <th>Name</th>
                <th>Email</th>
                <th>creation date</th>
              </tr>
            </thead>
            <tbody>
              {this.renderUsers()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  renderUsers() {
    if(this.props.users){
      return this.props.users.asMutable().map(el =>{
        console.log(el);
        return (
          <tr>
            <td className='vert-align'>{el.id}</td>
            <td className='vert-align'>{el.first_name + ' '+el.last_name}</td>
            <td className='vert-align'>{el.email}</td>
            <td className='vert-align'>{moment(el.date).format('ll')}</td>
            <td className='vert-align' >
              <button className='btn' onClick={this.props.delete.bind(this,el.id)} >delete</button>
            </td>
          </tr>
        );
      });
    }
  }
}

export default Users;

