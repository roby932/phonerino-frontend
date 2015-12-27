import HttpHash from 'http-hash';
import * as qs from 'query-string';

let hash = HttpHash();

export function setRoute(route) {
  hash.set(route);
}

export function parseUrl(location) {
  var q = qs.parse(location[1]);
  return Object.assign({}, {
    currentPath: location[0],
    segments: location[0].split('/'),
    queryParams: q,
  }, hash.get(location[0]));
}

export function initRouter(store, fn) {
  var url = window.location.pathname + window.location.search;

  function handleNewHash() {
    var location = window.location.hash.replace(/^#\/?|\/$/g, '').split('?');
    fn.call({}, location);
  }

  handleNewHash()
  window.addEventListener('hashchange', handleNewHash, false);
}
