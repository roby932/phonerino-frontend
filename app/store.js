import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import Immutable from 'seamless-immutable';

import app from './ducks/app';
import router from './ducks/router';

let initialState = Immutable({
  app: {
    page:'login',
    isLogged: false,
    loginLoading: false,
    user: false,
    phonesLoading: false,
    usersLoading: false,
    filterBrands: [],
    max_price: 0,
    has_buyout: false,
    order: 'phones.id',

  },
  router: { }
});


// add reducers and their actions in ducks/
// More: https://github.com/erikras/ducks-modular-redux
let reducer = combineReducers(Object.assign({}, {
  app,
  router
}));

let finalCreateStore = compose(applyMiddleware(thunk));

// set __DEVTOOLS__ to true in webpack.config.js to enable redux dev tools
if(__DEVTOOLS__) {
  const { devTools, persistState } = require('redux-devtools');
  finalCreateStore = compose(finalCreateStore,
      devTools(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  )
}

finalCreateStore = finalCreateStore(createStore);

export default finalCreateStore(reducer, initialState);
