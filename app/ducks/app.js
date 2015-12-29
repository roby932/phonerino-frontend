import { createAction } from 'redux-actions';
import { bindActionCreators } from 'redux';
import Immutable from 'seamless-immutable';
import {apiLogin} from '../api';

export const loginStart     = createAction('app/LOGIN_START');
export const loginDone     = createAction('app/LOGIN');
export const loginEnd     = createAction('app/LOGIN_END');
export const navigateTo = createAction('app/NAVIGATE_TO');

export default function reducer(state = Immutable({}), action) {
  switch(action.type)  {
    case 'app/LOGIN_START':
      return state.merge({loginLoading: true});
    case 'app/LOGIN_END':
      return state.merge({loginLoading: false});
    case 'app/LOGIN':
      return state.merge({isLogged: true});
    case 'app/LOGOUT':
      return state.merge({isLogged: false});
    case 'app/NAVIGATE_TO':
      return state.merge({page: action.payload.toString()});
    default:
      return state;
  }
}

export function login(endpoint,data) {
  return (dispatch, getState) => {
    dispatch(loginStart);
    //apicall
    //localStorage.setItem('current_user', JSON.stringify(response));
    apiLogin(endpoint,data)
    .then(
    (response) => {
      localStorage.setItem('current_user', JSON.stringify(response));
      dispatch(loginDone);
      dispatch(loginEnd);
    },
    (err) => {
      alert('error');
      dispatch(loginEnd);
    });
  }
}
