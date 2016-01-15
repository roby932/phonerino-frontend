import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AddProduct from '../components/AddProduct';
import {addProduct} from '../ducks/app';


function mapStateToProps(state) {
  return {
    page: state.router.currentPath,
    loading: state.app.loginLoading,
    brands: state.app.brands
  }
}


function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({
    add: addProduct
  }, dispatch) };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddProduct)
