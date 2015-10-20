import React, { Component } from 'react';
import ReactDOM from 'react-dom';

require('./app.scss');
require('hint.css/src/hint.scss');

// set global for query for bootstrap
import jQuery from 'jquery';
window.jQuery = window.$ = jQuery;
require('./bootstrap.js');

ReactDOM.render((
  <div>
    Heloo world?
  </div>
), document.getElementById('app-container'));
