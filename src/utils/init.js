import { setMenuFold } from '../redux/actions/menu';
import { loginSuccess } from '../redux/actions/user';

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
};
