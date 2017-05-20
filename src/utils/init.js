import { setCurrentItem, setOpenKeys } from 'REDUX/actions/menu';
import { loginSuccess } from 'REDUX/actions/user';

export const init = (store) => {
  //刷新页面或者首次访问时，判断本地是否存在token
  const token = localStorage.token;
  const isAdmin = localStorage.isAdmin === 'true' ? true : false;

  if (token) {
    store.dispatch(loginSuccess(token, isAdmin, localStorage.userName));
  }
  //根据当前的url路径，设置对应的sidebar高亮
  const location = window.location.pathname;
  const arr = location.split('/');
  if (arr[1] && arr[2]) {
    store.dispatch(setOpenKeys([arr[1]]));
    store.dispatch(setCurrentItem(arr[2]));
  } else if (arr[1]) {
    // store.dispatch(setOpenKeys(['']));
    store.dispatch(setCurrentItem(arr[1]));
  }
};
