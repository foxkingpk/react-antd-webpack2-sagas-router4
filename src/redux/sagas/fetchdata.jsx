import {
  put,
  call,
  takeEvery
} from 'redux-saga/effects';

import API from '../../api/index';
import { REQUEST_DATA } from '../actions/actionstype';
import { reciveData } from '../actions/user';


function fetchdata() {
  return API.getOrderState();
}

function* fetchDataRequest() {
  const res = yield call(fetchdata);
  yield put(reciveData(res));
}

export function* fetchData() {
  yield takeEvery(REQUEST_DATA, fetchDataRequest);
}

