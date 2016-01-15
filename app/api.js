import R from 'ramda';
import { request, authenticatedRequest } from './request';
let baseUrl = 'http://localhost:3000';

export function apiLogin(endpoint, params) {
  return request('post', `${baseUrl}/api/${endpoint}`)
    .send(params);
}

export function apiEditUser(endpoint, params) {
  return authenticatedRequest('put', `${baseUrl}/api/user/${endpoint}`)
    .send(params);
}

export function stats(projectId, params) {
  return  authenticatedRequest('get', `${baseUrl}/api/v1/projects/${projectId}/analysis/stats`)
}

export function apiGetBrands() {
  return  authenticatedRequest('get', `${baseUrl}/api/brand`)
}

export function apiGetUsers() {
  return  authenticatedRequest('get', `${baseUrl}/api/user`)
}

export function apiGetPhones(query) {
  return  authenticatedRequest('get', `${baseUrl}/api/phone`).query(query || {})
}


export function apiAddProduct(params) {
  return  authenticatedRequest('post', `${baseUrl}/api/phone`)
    .send(params);
}
