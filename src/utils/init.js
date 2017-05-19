import { setCurrentItem, setOpenKeys } from 'REDUX/actions/menu';
import { loginSuccess } from 'REDUX/actions/user';

export const init = (store) => {
  //刷新页面或者首次访问时，判断本地是否存在token
  const token = localStorage.token;
  const isAdmin = localStorage.isAdmin ? true : false;
  if (token) {
    store.dispatch(loginSuccess(token, isAdmin, localStorage.userName));
  }
  //根据当前的url路径，设置对应的sidebar高亮
  const location = window.location;
  if (location.pathname.match(/\/$/)) {
    if (store.getState().userReducer.isAdmin) {
      store.dispatch(setOpenKeys(['ordersAssign']));
      store.dispatch(setCurrentItem('orderUnassign'));
    } else {
      store.dispatch(setOpenKeys(['ordersCenter']));
      store.dispatch(setCurrentItem('orderListNew'));
    }
    
  } else {
    if (location.pathname.match(/\/orderListNew$/g)) {
      store.dispatch(setOpenKeys(['ordersCenter']));
      store.dispatch(setCurrentItem('orderListNew'));
    } else if (location.pathname.match(/\/orderListFinish$/g)) {
      store.dispatch(setOpenKeys(['ordersCenter']));
      store.dispatch(setCurrentItem('orderListFinish'));
    } else if (location.pathname.match(/\/printerManager$/g)) {
      store.dispatch(setOpenKeys(['print']));
      store.dispatch(setCurrentItem('printerManager'));
    } else if (location.pathname.match(/\/senderSetting$/g)) {
      store.dispatch(setOpenKeys(['print']));
      store.dispatch(setCurrentItem('senderSetting'));
    } else if (location.pathname.match(/\/orderUnassign$/g)) {
      store.dispatch(setOpenKeys(['ordersAssign']));
      store.dispatch(setCurrentItem('orderUnassign'));
    } else if (location.pathname.match(/\/orderAssigned$/g)) {
      store.dispatch(setOpenKeys(['ordersAssign']));
      store.dispatch(setCurrentItem('orderAssigned'));
    }
  }
};
