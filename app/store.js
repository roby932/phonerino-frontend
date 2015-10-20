import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import Immutable from 'immutable';

import app from './ducks/app';

let initialState = ({
  app: Immutable.fromJS({
    dummy:false,
  }),
});

let finalCreateStore = compose(applyMiddleware(thunk));

if(__DEVTOOLS__) {
  const { devTools, persistState } = require('redux-devtools');
  finalCreateStore = compose(finalCreateStore,
      devTools(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  )
}

finalCreateStore = finalCreateStore(createStore);

let reducer = combineReducers({
  app
});

export default finalCreateStore(reducer, initialState);

