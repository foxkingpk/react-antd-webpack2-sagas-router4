import { DEFAULTITEM, OPENKEYS } from '../actions/actionstype.js';

const menuReducer = (state = {
  currentItem: '',
  openKeys: ['']
}, action) => {
  switch (action.type) {
    case DEFAULTITEM:
      return {
        ...state,
        currentItem: action.data
      };
    case OPENKEYS:
      return {
        currentItem: '',
        openKeys: action.data
      };
    default:
      return state;
  }
};

export default menuReducer;
