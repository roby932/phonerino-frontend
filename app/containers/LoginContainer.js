import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Login from '../components/Login';
import {login} from '../ducks/app';


function mapStateToProps(state) {
  return {
    page: state.router.currentPath,
    loading: state.app.loginLoading
  }
}


function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({
    login:login
  }, dispatch) };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
