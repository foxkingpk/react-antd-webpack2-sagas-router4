import { setCurrentItem, setOpenKeys } from 'REDUX/actions/menu';
import { loginSuccess } from 'REDUX/actions/user';

export const init = (store) => {
  //刷新页面或者首次访问时，判断本地是否存在token
  const token = localStorage.token;
  if (token) {
    store.dispatch(loginSuccess(token));
  }
  //根据当前的url路径，设置对应的sidebar高亮
  const location = window.location;
  if (location.pathname.match(/\/$/)) {
    store.dispatch(setCurrentItem('orders'));
  } else {
    if (location.pathname.match(/\/ordersCenter$/g)) {
      store.dispatch(setCurrentItem('orders'));
    } else {
      store.dispatch(setOpenKeys(['print']));
      if (location.pathname.match(/\/printMachineManager$/g)) {
        store.dispatch(setCurrentItem('printMachineManager'));
      } else if (location.pathname.match(/\/printTemplate$/g)) {
        store.dispatch(setCurrentItem('printTemplate'));
      }
    }
  }
};
