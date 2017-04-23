import { LOGIN, LOGOUT, RECIVE_DATA } from '../actions/actionstype.js';
const isLogin = ()=>{
  let loginCookie = document.cookie.match(/XID=([^;]\w*)/);
     if(loginCookie && loginCookie[1]){
        return true;
     }
     return false;
}
const loginReducer = (state = {
  isLogin: isLogin(),
  posts: ''
}, action) => {
  switch(action.type) {
    case LOGIN:
     const res = action.loginResult;
     let isLogin= false;
     if(res.status == 200) {
       document.cookie=`XID=${res.data.token}`;
       isLogin = true;
     }

     return {
       isLogin: isLogin
     }
    case LOGOUT:
      console.log("*****logout")
      document.cookie='XID==0;expires=' + new Date( 0).toUTCString(); 
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
