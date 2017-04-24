import {
  put,
  call,
  take,
  fork
} from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import axios from 'axios';
import 'babel-polyfill';
import { LOGOUT_REQUEST, LOGOUT } from '../actions/actionstype.js';



function logout() {
  return axios.get("http://localhost/xxx/logout").then((response) => {
    const { status } = response;
    console.log(status);
    return {
      status,
      data: response.data
    };
  }).then((response) => {
    return response;
  });
}

function* logoutRequest() {
  const logoutResult = yield call(logout);
  yield put({ type: LOGOUT, logoutResult });
}

export function* signout() {
  yield* takeEvery(LOGOUT_REQUEST, logoutRequest);
}
