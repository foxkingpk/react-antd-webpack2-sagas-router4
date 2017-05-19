import { DEFAULTITEM, OPENKEYS } from '../actions/actionstype.js';

const menuReducer = (state = {
  currentItem: '',
  openKeys: ['']
}, action) => {
  switch (action.type) {
    case DEFAULTITEM:
      return {
        ...state,
        currentItem: action.payload
      };
    case OPENKEYS:
      return {
        ...state,
        openKeys: action.payload
      };
    default:
      return state;
  }
};

export default menuReducer;
