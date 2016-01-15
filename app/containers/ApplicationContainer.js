import { Component } from 'react';
import { connect } from 'react-redux';
import Application from '../components/Application';
import {navigateTo, logout,filterChange, buyout,setMax,orderBy} from '../ducks/app';
import { bindActionCreators } from 'redux';

function mapStateToProps(state) {
  return state.app
}


function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({
    navigateTo: navigateTo,
    logout: logout,
    setFilters: filterChange,
    maxPrice: setMax,
    hasBuyout: buyout,
    orderBy:orderBy
  }, dispatch) };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Application)
