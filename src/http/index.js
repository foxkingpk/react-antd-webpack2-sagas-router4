import axios from 'axios';
import qs from 'qs';
import store from 'REDUX/store/';
import { loginFailure } from 'REDUX/actions/user';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// http request 拦截器
axios.interceptors.request.use(
    (config) => {
      // if (localStorage.token) {
      //   config.headers.Authorization = `token ${localStorage.token}`;
      // }
      NProgress.start();
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
);

// http response 拦截器
axios.interceptors.response.use(
    (response) => {
      NProgress.done();
      return response;
    },
    (error) => {
      console.log('response interceptors:', error.response);
      if (error.response) {
        switch (error.response.status) {
          case 401:
            store.dispatch(loginFailure({
              code: 401,
              msg: error.response.data
            }));
            break;
          default:
            break;
        }
        // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
        return Promise.reject({
          status: error.response.status,
          msg: error.response.data,
          data: ''
        });
      }
    }
);

const Get = (url, payload) => {
  const obj = {
    params: null
  };
  if (payload) {
    obj.params = payload;
  }
  return new Promise((resolve, reject) => {
    axios.get(url, obj).then((response) => {
      resolve({
        status: response.status,
        data: response.data
      });
    }).catch((error) => {
      reject(error);
    });
  });
};

const Post = (url, payload) => {
  return new Promise((resolve, reject) => {
    axios.post(url, qs.stringify(
      payload
    )).then((response) => {
      resolve({
        status: response.status,
        data: response.data
      });
    }).catch((error) => {
      reject(error);
    });
  });
};

export default {
  Get,
  Post
};
