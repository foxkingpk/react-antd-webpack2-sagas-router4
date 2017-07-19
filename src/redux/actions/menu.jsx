import { OPENKEYS, DEFAULTITEM, MENUFOLD } from '../actions/actionstype.js';

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
export const setMenuFold = (data) => {
  localStorage.setItem('menuFold', data);
  return {
    type: MENUFOLD,
    payload: data
  };
};
