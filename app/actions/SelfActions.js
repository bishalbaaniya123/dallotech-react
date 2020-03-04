import * as types from './actionConstants';

export const tokenAction = token =>{
  console.log("this is token action", token);
  return {
    type: types.TOKEN_SAVE,
    payload: token,
  };
};

/*
export function tokenAction(token) {
  console.log('this is tokenAction from actions', token);
  return {
    type: types.TOKEN_SAVE,
    payload: token,
  };
}
*/
