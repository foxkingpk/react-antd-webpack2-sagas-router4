import { setMenuFold, setOpenKeys } from 'REDUX/actions/menu';
import { loginSuccess } from 'REDUX/actions/user';

export const init = (store) => {
  //刷新页面或者首次访问时，判断本地是否存在token
  const token = localStorage.token;
  const isAdmin = localStorage.isAdmin === 'true' ? true : false;

  if (token) {
    store.dispatch(loginSuccess(token, isAdmin, localStorage.userName));
  }
  if (localStorage.menuFold) {
    store.dispatch(setMenuFold(localStorage.menuFold === 'true' ? true : false));
  }
  const location = window.location.pathname;
  const arr = location.split('/');
  if (arr[1] && arr[2] && arr[3]) {
    store.dispatch(setOpenKeys([arr[1], 'msgOrder']));
  } else if (arr[1] && arr[2]) {
    store.dispatch(setOpenKeys([arr[1]]));
  }
};
