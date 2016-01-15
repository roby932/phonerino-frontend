import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import { retrieveLocalUser } from '../utils';

class AddProduct extends Component {
  constructor(props) {
    super(props);
    let user = retrieveLocalUser();
    this.state = {
      user: user.body,
      sel: '0'
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
            <div className="panel-heading">Add product</div>
            <div className="panel-body">
              <form onSubmit={this.add.bind(this)}>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Name</label>
                  <input ref={(ref) => this.name = ref} required
                    type="text" className="form-control" id="exampleInputEmail1" placeholder="Name" />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Start price</label>
                  <input ref={(ref) => this.start = ref} required
                    type="number" className="form-control" id="exampleInputEmail1" placeholder="start price" />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Buyout price</label>
                  <input ref={(ref) => this.buy = ref}
                    type="number" className="form-control" id="exampleInputEmail1" placeholder="buyout price" />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Info</label>
                  <input ref={(ref) => this.info = ref}
                    type="text" className="form-control" id="exampleInputPassword1" placeholder="info" />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">brand</label>
                  <select className="form-control" onChange={this.change.bind(this)} value={this.state.sel}>
                    <option value='0'>Select brand</option>
                   {this.renderBrands()}
                  </select>
                </div>
                <button type="submit" className="btn btn-default">Add product</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderBrands() {
    return this.props.brands.asMutable().map(
      function(el){
        return <option value={el.id}>{el.name}</option>
      }
    );
  }

  change(event){
    this.setState({sel: event.target.value});
  }

  add(e) {
    e.preventDefault();
    if(this.state.sel == 0){alert('select brand');return;}
    this.props.actions.add(
      {
        data:{
          name: this.name.value,
          brand_id: this.state.sel,
          start_price: this.start.value,
          buyout_price: this.buy.value || 0,
          info: this.info.value
        }
      });
  }
}
export default AddProduct;

