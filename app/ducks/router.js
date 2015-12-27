import { createAction } from 'redux-actions';
import { bindActionCreators } from 'redux';
import Immutable from 'seamless-immutable';
import { parseUrl } from '../router';

export const navigateTo = createAction('router/NAVIGATE_TO');

export default function reducer(state = Immutable({}), action) {
  switch(action.type)  {
    case 'router/NAVIGATE_TO':
      return Immutable(parseUrl(action.payload));
    default:
      return state;
  }
}
