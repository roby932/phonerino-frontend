import { Component } from 'react';
import { connect } from 'react-redux';
import Application from '../components/Application';

function mapStateToProps(state) {
  return {
    page: state.router.currentPath
  }
}


function mapDispatchToProps(dispatch) {
  return { }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Application)
