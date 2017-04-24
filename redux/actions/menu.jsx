import { OPENKEYS, DEFAULTITEM } from '../actions/actionstype.js';

export const setCurrentItem = (data) => {
  return {
    type: DEFAULTITEM,
    data
  };
};
export const setOpenKeys = (data) => {
  return {
    type: OPENKEYS,
    data
  };
};
