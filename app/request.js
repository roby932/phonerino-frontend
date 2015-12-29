import superagent from 'superagent-bluebird-promise';
import { retrieveLocalUser } from './utils';

export function request(method, url) {
  return superagent(method, url)
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
}

export function authenticatedRequest(method, url) {
  let user = retrieveLocalUser();
  if (user) {
    return superagent(method, url)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('AuthorizationToken', user.auth_token);
  }
  return request;
}
