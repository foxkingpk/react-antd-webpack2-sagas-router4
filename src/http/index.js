import axios from 'axios';
import store from 'REDUX/store/';
import { loginFailure } from 'REDUX/actions/user';

// http request 拦截器
axios.interceptors.request.use(
    (config) => {
      // if (localStorage.TOKEN) {
      //   config.headers.Authorization = `token ${localStorage.TOKEN}`;
      // }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
);

//http response 拦截器
axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log("response interceptors:",error.response);
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
    axios.post(url, {
      data: payload
    }).then((response) => {
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
