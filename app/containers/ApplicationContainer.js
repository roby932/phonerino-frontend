import { Component } from 'react';
import { connect } from 'react-redux';
import Application from '../components/Application';
import {navigateTo} from '../ducks/app';
import { bindActionCreators } from 'redux';

function mapStateToProps(state) {
  return {
    page: state.app.page
  }
}


function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({
    navigateTo:navigateTo
  }, dispatch) };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Application)
