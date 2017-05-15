import { OPENKEYS, DEFAULTITEM } from '../actions/actionstype.js';

export const setCurrentItem = (data) => {
  return {
    type: DEFAULTITEM,
    payload: data
  };
};
export const setOpenKeys = (data) => {
  return {
    type: OPENKEYS,
    payload: data
  };
};
