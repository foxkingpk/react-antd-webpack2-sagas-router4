import { combineReducers } from 'redux';
import loginReducer from './login';
import menuReducer from './menu';

const rootReducer = combineReducers({
  loginReducer,
  menuReducer
});
export default rootReducer;
