import {
  put,
  call,
  take,
  fork
} from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import axios from 'axios';
import 'babel-polyfill';
import { LOGIN_REQUEST, LOGIN } from '../actions/actionstype.js';


function login() {
  return axios.get(`http://localhost/xxx/login`).then((response) => {
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

function* loginRequest() {
  const loginResult = yield call(login);
  yield put({ type: LOGIN, loginResult });
}

// export function* watchPost() {
//    while(true){
//     yield take('NND');
//     yield fork(fetchPosts);
//    }
// }
export function* signin() {
  while (true) {
    yield take(LOGIN_REQUEST);
    yield fork(loginRequest);
  }
}

