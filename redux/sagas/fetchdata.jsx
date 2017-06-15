import {
  put,
  call,
  takeEvery
} from 'redux-saga/effects';

import API from 'API';
import { REQUEST_DATA } from 'REDUX/actions/actionstype';
import { reciveData } from 'REDUX/actions/user';


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

