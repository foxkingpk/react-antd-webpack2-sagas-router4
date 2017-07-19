import { message } from 'antd';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS, RECIVE_DATA, TOGGLE_ORDER_DETAIL } from '../actions/actionstype.js';


const userReducer = (state = {
  authenticated: false,
  isAuthenticating: false,
  customData: '',
  token: '',
  statusText: '',
  isAdmin: false,
  userName: '',
  showOrderDetail: true
}, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isAuthenticating: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        authenticated: true,
        isAuthenticating: false,
        token: action.payload.token,
        isAdmin: action.payload.isAdmin,
        userName: action.payload.userName
      };
    case LOGIN_FAILURE:
      message.error(action.payload.msg);
      return {
        ...state,
        authenticated: false,
        isAuthenticating: false,
        token: '',
        statusText: action.payload.msg,
        isAdmin: false,
        userName: ''
      };
    case LOGOUT_REQUEST:
      return state;
    case LOGOUT_SUCCESS:
      return {
        ...state,
        authenticated: false,
        isAuthenticating: false,
        token: null,
        statusText: '',
        isAdmin: false,
        userName: ''
      };
    case RECIVE_DATA:
      return {
        ...state,
        customData: action.payload
      };
    case TOGGLE_ORDER_DETAIL:
      return {
        ...state,
        showOrderDetail: !state.showOrderDetail
      };
    default:
      return state;
  }
};
export default userReducer;
