import { REQUEST_DATA, LOGIN_REQUEST, LOGOUT_REQUEST } from './actionstype.js';

export const login = (data) => {
  return { type: LOGIN_REQUEST, data };
};
export const logout = (data) => {
  return { type: LOGOUT_REQUEST, data };
};
export const requestData = (data) => {
  return { type: REQUEST_DATA, data };
};
