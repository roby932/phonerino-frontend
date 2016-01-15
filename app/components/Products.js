import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { retrieveLocalUser } from '../utils';
import moment from 'moment';

class Products extends Component {

  render() {
    return (
      <div className="col-md-12">
        <div className='col-md-3'>
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">Brands</h3>
            </div>
            <div className="panel-body">
              {this.renderBrands()}
            </div>
          </div>
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title" >Price</h3>
            </div>
            <div className="panel-body">
              <input type='number' className='form-control' placeholder='max price' onChange={this.handlePrice.bind(this)}/>
              <div className="checkbox">
                <label>
                  <input type="checkbox" id="checkboxSuccess" onChange={this.handleBuyout.bind(this)} />
                  Has buyout
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-9 table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th onClick={this.props.orderBy.bind(this,'phones.name')}>Name</th>
                <th onClick={this.props.orderBy.bind(this,'brands.name')}>Brand</th>
                <th onClick={this.props.orderBy.bind(this,'users.email')}>Posted by</th>
                <th onClick={this.props.orderBy.bind(this,'phones.start_price')}>Price</th>
                <th onClick={this.props.orderBy.bind(this,'phones.buyout_price')}>Buyout</th>
                <th onClick={this.props.orderBy.bind(this,'phones.created_at')}>creation date</th>
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
  handleBuyout(e) {
    this.props.hasBuyout(e.target.checked);
  }

  handlePrice(e) {
    this.props.maxPrice(e.target.value);
  }

  renderBrands() {
    if(this.props.brands){
      return this.props.brands.asMutable().map((el,id) => {
        return (
        <div className="checkbox">
          <label>
            <input type="checkbox" id="checkboxSuccess" onChange={this.filterChange.bind(this,el.id)} />
            {el.name}
          </label>
        </div>);
      });
    }
  }
  filterChange(id,e) {
    this.props.setFilter(id);
  }

  renderUsers() {
    if(this.props.loading){
      return (<div>loading</div>);
    }
    if(this.props.phones){
      return this.props.phones.asMutable().map(el =>{
        console.log(el);
        return (
          <tr>
            <td className='vert-align'>{el.name}</td>
            <td className='vert-align'>{el.brand_name}</td>
            <td className='vert-align'>{el.first_name + ' '+ el.last_name}</td>
            <td className='vert-align'>{el.start_price}</td>
            <td className='vert-align'>{el.buyout_price}</td>
            <td className='vert-align'>{moment(el.date).format('ll')}</td>
            <td className='vert-align' >
              <button className='btn' onclick={this.props.delete.bind(this,el.id)} >delete</button>
            </td>
          </tr>
        );
      });
    }
  }
}

export default Products;

