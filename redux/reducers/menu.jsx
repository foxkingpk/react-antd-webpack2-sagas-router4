import { DEFAULTITEM, OPENKEYS } from '../actions/actionstype.js';

const menuReducer = (state = {
  currentItem: 'orders',
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
        currentItem: '',
        openKeys: action.payload
      };
    default:
      return state;
  }
};

export default menuReducer;
