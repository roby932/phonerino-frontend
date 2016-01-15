import { createAction } from 'redux-actions';
import { bindActionCreators } from 'redux';
import Immutable from 'seamless-immutable';
import {apiEditUser, apiLogin, apiGetBrands, apiAddProduct, apiGetUsers, apiGetPhones} from '../api';
import R from 'ramda';

export const loginStart     = createAction('app/LOGIN_START');
export const loginDone      = createAction('app/LOGIN_DONE');
export const loginEnd       = createAction('app/LOGIN_END');
export const saveUser       = createAction('app/SAVE_USER');
export const logout         = createAction('app/LOGOUT');
export const addPhones      = createAction('app/ADD_PHONES');
export const addBrands      = createAction('app/ADD_BRANDS');
export const addUsers       = createAction('app/ADD_USERS');
export const navigateTo     = createAction('app/NAVIGATE_TO');
export const toogleBrands   = createAction('app/TOOGLE_BRANDS');
export const setMaxPrice    = createAction('app/MAX_PRICE');
export const hasBuyout      = createAction('app/HAS_BUYOUT');
export const order          = createAction('app/ORDER_BY');
export const phonesLoading  = createAction('app/PRODUCTS_LOADING');
export const userssLoading  = createAction('app/USERS_LOADING');

export default function reducer(state = Immutable({}), action) {
  switch(action.type)  {
    case 'app/LOGIN_START':
      return state.merge({loginLoading: true});
    case 'app/LOGIN_END':
      return state.merge({loginLoading: false});
    case 'app/MAX_PRICE':
      return state.merge({max_price: action.payload});
    case 'app/ORDER_BY':
      return state.merge({order: action.payload});
    case 'app/HAS_BUYOUT':
      return state.merge({has_buyout: action.payload});
    case 'app/PRODUCTS_LOADING':
      return state.merge({phonesLoading: action.payload});
    case 'app/USERS_LOADING':
      return state.merge({userssLoading: action.payload});
    case 'app/LOGIN_DONE':
      return state.merge({isLogged: true});
    case 'app/SAVE_USER':
      return state.merge({user: action.payload});
    case 'app/ADD_BRANDS':
      return state.merge({brands: action.payload});
    case 'app/ADD_PHONES':
      return state.merge({phones: action.payload});
    case 'app/TOOGLE_BRANDS':
      var brands = state.filterBrands.asMutable();
      if(brands.indexOf(action.payload) === -1){
        brands.push(action.payload)
      } else {
        brands = R.filter((el) => {return el!==action.payload},brands);
      }
      return state.merge({filterBrands: brands});
    case 'app/ADD_USERS':
      return state.merge({users: action.payload});
    case 'app/LOGOUT':
      return state.merge({isLogged: false});
    case 'app/NAVIGATE_TO':
      return state.merge({page: action.payload.toString()});
    default:
      return state;
  }
}

export function fetchBrands() {//login and sign up
  return (dispatch, getState) => {
    apiGetBrands()
    .then(
    (response) => {
      dispatch(addBrands(response.body));
    },
    (err) => {
      alert('add product may not work')
    });
  }
}

export function fetchUsers() {//login and sign up
  return (dispatch, getState) => {
    apiGetUsers()
    .then(
    (response) => {
      dispatch(addUsers(response.body));
    },
    (err) => {
      alert('users may not work')
    });
  }
}

export function fetchPhones(query) {//login and sign up
  return (dispatch, getState) => {
    dispatch(phonesLoading(true))
    apiGetPhones(query)
    .then(
    (response) => {
      dispatch(addPhones(response.body));
      dispatch(phonesLoading(false))
    },
    (err) => {
      alert('phone may not work')
      dispatch(phonesLoading(false))
    });
  }
}

export function login(endpoint,data) {//login and sign up
  return (dispatch, getState) => {
    dispatch(loginStart());
    apiLogin(endpoint,data)
    .then(
    (response) => {
      localStorage.setItem('current_user', JSON.stringify(response));
      dispatch(loginDone());
      dispatch(loginEnd());
      dispatch(fetchBrands());
      dispatch(fetchUsers());
      dispatch(fetchPhones());
      dispatch(saveUser(response.body));
      dispatch(navigateTo('home'))
    },
    (err) => {
      alert('error');
      dispatch(loginEnd());
    });
  }
}

export function editUser(userId,data) {
  return (dispatch, getState) => {
    dispatch(loginStart());
    apiEditUser(userId,data)
    .then(
    (response) => {
      localStorage.setItem('current_user', JSON.stringify(response));
      dispatch(loginEnd());
      dispatch(saveUser(response.body));
      dispatch(navigateTo('home'))
      alert('saved succesfully');
    },
    (err) => {
      alert('error');
      dispatch(loginEnd());
    });
  }
}

export function addProduct(data) {
  return (dispatch, getState) => {
    dispatch(loginStart());
    apiAddProduct(data)
    .then(
    (response) => {
      dispatch(loginEnd());
      dispatch(fetchPhones());
      dispatch(navigateTo('home'))
      alert('product added succesfully');
    },
    (err) => {
      alert('error');
      dispatch(loginEnd());
    });
  }
}
export function filterChange(data) {
  return (dispatch, getState) => {

    dispatch(toogleBrands(data));
    dispatch(fetchPhones({
      brands:getState().app.filterBrands.asMutable(),
      max_price:getState().app.max_price || 0,
      has_buyout: getState().app.has_buyout,
      order: getState().app.order,
    }));
  }
}

export function setMax(data) {
  return (dispatch, getState) => {
    dispatch(setMaxPrice(data));
    dispatch(fetchPhones({
      brands:getState().app.filterBrands.asMutable(),
      max_price:getState().app.max_price || 0,
      has_buyout: getState().app.has_buyout,
      order: getState().app.order,
    }));
  }
}

export function buyout(data) {
  return (dispatch, getState) => {
    dispatch(hasBuyout(data));
    dispatch(fetchPhones({
      brands:getState().app.filterBrands.asMutable(),
      max_price:getState().app.max_price || 0,
      has_buyout: getState().app.has_buyout,
      order: getState().app.order,
    }));
  }
}

export function orderBy(data) {
  return (dispatch, getState) => {
    dispatch(order(data));
    dispatch(fetchPhones({
      brands:getState().app.filterBrands.asMutable(),
      max_price:getState().app.max_price || 0,
      has_buyout: getState().app.has_buyout ,
      order: getState().app.order,
    }));
  }
}
