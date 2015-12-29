import R from 'ramda';
import { request, authenticatedRequest } from './request';
let baseUrl = 'http://localhost:3000';

export function apiLogin(endpoint, params) {
  console.log(params);
  return request('post', `${baseUrl}/api/${endpoint}/`)
    .send(params);
}

export function stats(projectId, params) {
  return  authenticatedRequest('get', `${baseUrl}/api/v1/projects/${projectId}/analysis/stats`)
}
