import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import ApplicationContainer from './containers/ApplicationContainer';
import { navigateTo } from './ducks/router';
import { initRouter, setRoute } from './router';
import routes from './routes'
import R from 'ramda';

// Import main css file.
import './app.scss';


// set __DEVTOOLS__ to true in webpack.config.js to enable redux dev tools
function renderDevTools() {
  if(__DEVTOOLS__) {
    const { DevTools, DebugPanel, LogMonitor } = require('redux-devtools/lib/react');
    return (
      <DebugPanel top right bottom>
        <DevTools store={store} monitor={LogMonitor} />
      </DebugPanel>
    );
  }
};

// load routes
R.map(setRoute, routes);


initRouter(store, function(location) {
  store.dispatch(navigateTo(location));
});


ReactDOM.render((
  <div>
    <Provider store={store}>
      <ApplicationContainer/>
    </Provider>
    {renderDevTools()}
  </div>
), document.getElementById('app-container'));
