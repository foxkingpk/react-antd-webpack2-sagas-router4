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
import { setCurrentItem, setOpenKeys } from 'REDUX/actions/menu';

function login(data) {
  return API.getLoginResource(data);
}

function* loginRequest(data) {
  const response = yield call(login, data);
  if (response.data.code === 200) {
    let isAdmin = false;
    console.log(data.username.toLowerCase());
    if (data.username.toLowerCase() === 'admin') {
      console.log("bingo")
      isAdmin = true;
    }
    yield put(loginSuccess(response.data.payload.token, isAdmin, data.username));
    if (isAdmin) {
      yield put(setCurrentItem('orderUnassign'));
      yield put(setOpenKeys(['ordersAssign']));
    } else {
      yield put(setCurrentItem('orderListNew'));
      yield put(setOpenKeys(['ordersCenter']));
    }
  } else {
    yield put(loginFailure({
      code: response.data.code,
      msg: response.data.msg
    }));
  }
}

export function* signin() {
  while (true) {
    const resData = yield take(LOGIN_REQUEST);
    yield fork(loginRequest, resData.payload);
  }
}

