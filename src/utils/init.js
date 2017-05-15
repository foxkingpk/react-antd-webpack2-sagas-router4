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
    store.dispatch(setOpenKeys(['ordersCenter']));
    store.dispatch(setCurrentItem('orderListNew'));
  } else {
    if (location.pathname.match(/\/orderListNew$/g)) {
      store.dispatch(setOpenKeys(['ordersCenter']));
      store.dispatch(setCurrentItem('orderListNew'));
    } else if (location.pathname.match(/\/orderListFinish$/g)) {
      store.dispatch(setOpenKeys(['ordersCenter']));
      store.dispatch(setCurrentItem('orderListFinish'));
    } else if (location.pathname.match(/\/printMachineManager$/g)) {
      store.dispatch(setOpenKeys(['print']));
      store.dispatch(setCurrentItem('printMachineManager'));
    } else if (location.pathname.match(/\/printTemplate$/g)) {
      store.dispatch(setOpenKeys(['print']));
      store.dispatch(setCurrentItem('printTemplate'));
    }
  }
};
