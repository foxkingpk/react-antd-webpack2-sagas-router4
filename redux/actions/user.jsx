import { REQUEST_DATA, RECIVE_DATA, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS, TOGGLE_ORDER_DETAIL } from './actionstype.js';

export const loginRequest = (data) => {
  return { type: LOGIN_REQUEST, payload: data };
};
export const loginSuccess = (token, isAdmin, userName) => {
  localStorage.setItem('token', token);
  localStorage.setItem('isAdmin', isAdmin);
  localStorage.setItem('userName', userName);
  return { type: LOGIN_SUCCESS, payload: { token, isAdmin, userName } };
};
export const loginFailure = (data) => {
  localStorage.removeItem('token');
  localStorage.removeItem('isAdmin');
  localStorage.removeItem('userName');
  return { type: LOGIN_FAILURE, payload: { status: data.status, msg: data.msg } };
};
export const logoutRequest = () => {
  return { type: LOGOUT_REQUEST };
};
export const logoutSuccess = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('isAdmin');
  localStorage.removeItem('userName');
  return { type: LOGOUT_SUCCESS };
};
export const requestData = (data) => {
  return { type: REQUEST_DATA, payload: data };
};
export const reciveData = (data) => {
  return { type: RECIVE_DATA, payload: data };
};
export const toggleOrderDetail = (data) => {
  return { type: TOGGLE_ORDER_DETAIL, payload: data };
};
