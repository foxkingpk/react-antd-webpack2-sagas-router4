import { LOGIN, LOGOUT, RECIVE_DATA } from '../actions/actionstype.js';

const isLogin = () => {
  const loginCookie = document.cookie.match(/XID=([^;]\w*)/);
  if (loginCookie && loginCookie[1]) {
    return true;
  }
  return false;
};
const loginReducer = (state = {
  isLogin: isLogin(),
  posts: ''
}, action) => {
  switch(action.type) {
    case LOGIN:
      const res = action.loginResult;
      let signed = false;
      if (res.status === 200) {
        document.cookie = `XID=${res.data.token}`;
        signed = true;
      }

      return {
        isLogin: signed
      };
    case LOGOUT:
      document.cookie = 'XID==0;expires=' + new Date(0).toUTCString(); 
      return {
        isLogin: false
      };
    case RECIVE_DATA:
      return {
        ...state,
        posts: action.loginResult
      };
    default:
      return state;
  }
};
export default loginReducer;
