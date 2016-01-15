import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Edit from '../components/EditUser';
import {editUser} from '../ducks/app';


function mapStateToProps(state) {
  return {
    page: state.router.currentPath,
    loading: state.app.loginLoading,
    user: state.app.user
  }
}


function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({
    edit: editUser
  }, dispatch) };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Edit)
