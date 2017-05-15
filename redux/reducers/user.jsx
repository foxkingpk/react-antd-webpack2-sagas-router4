import { message } from 'antd';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS, RECIVE_DATA } from '../actions/actionstype.js';


const userReducer = (state = {
  authenticated: false,
  isAuthenticating: false,
  customData: '',
  token: '',
  statusText: ''
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
        token: action.payload.token
      };
    case LOGIN_FAILURE:
       message.error(action.payload.msg);
      return {
        ...state,
        authenticated: false,
        isAuthenticating: false,
        token: '',
        statusText: action.payload.msg
      };
    case LOGOUT_REQUEST:
      return state;
    case LOGOUT_SUCCESS:
      return {
        ...state,
        authenticated: false,
        isAuthenticating: false,
        token: null,
        statusText: ''
      };
    case RECIVE_DATA:
      return {
        ...state,
        customData: action.payload
      };
    default:
      return state;
  }
};
export default userReducer;
