import { createAction } from 'redux-actions';
import { bindActionCreators } from 'redux';
import Immutable from 'seamless-immutable';

export const loginStart     = createAction('app/LOGIN_START');

export default function reducer(state = Immutable({}), action) {
  switch(action.type)  {
    default:
      return state;
  }
}
