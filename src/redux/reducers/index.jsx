import { combineReducers } from 'redux';
import userReducer from './user';
import menuReducer from './menu';

const rootReducer = combineReducers({
  userReducer,
  menuReducer
});
export default rootReducer;
