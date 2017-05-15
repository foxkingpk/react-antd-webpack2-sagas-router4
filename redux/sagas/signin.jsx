import {
  put,
  call,
  take,
  fork
} from 'redux-saga/effects';

import API from 'API';
import 'babel-polyfill';
import { LOGIN_REQUEST } from 'REDUX/actions/actionstype';
import { loginSuccess, loginFailure } from 'REDUX/actions/user';


function login(data) {
  return API.getLoginResource(data);
}

function* loginRequest(data) {
  const response = yield call(login, data);
  console.log("loginRequest",response);
  if (response.data.code === 200) {
    yield put(loginSuccess(response.data.payload.token));
  } else {
    yield put(loginFailure({
      code: response.data.code,
      msg: response.data.msg
    }));
  }
}

export function* signin() {
  while (true) {
    const payload = yield take(LOGIN_REQUEST);
    yield fork(loginRequest, payload.data);
  }
}

