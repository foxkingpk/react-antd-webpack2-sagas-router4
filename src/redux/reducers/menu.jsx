import { DEFAULTITEM, OPENKEYS, MENUFOLD } from '../actions/actionstype.js';

const menuReducer = (state = {
  currentItem: '',
  openKeys: [''],
  menuFold: false
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
    case MENUFOLD:
      return {
        ...state,
        menuFold: action.payload
      };
    default:
      return state;
  }
};

export default menuReducer;
