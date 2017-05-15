import {
  put,
  call
} from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import API from 'API';
import 'babel-polyfill';
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
  yield* takeEvery(REQUEST_DATA, fetchDataRequest);
}

