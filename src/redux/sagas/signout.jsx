import {
  put,
  call,
  takeEvery
} from 'redux-saga/effects';
import API from '../../api/index';
import { LOGOUT_REQUEST } from '../actions/actionstype';
import { logoutSuccess } from '../actions/user';
import { setCurrentItem, setOpenKeys } from '../actions/menu';

function logout() {
  return API.getLogoputResource();
}

function* logoutRequest() {
  const key = [''];
  const item = 'orders';
  yield call(logout);
  yield put(logoutSuccess());
  yield put(setOpenKeys(key));
  yield put(setCurrentItem(item));
}

export function* signout() {
  yield takeEvery(LOGOUT_REQUEST, logoutRequest);
}
