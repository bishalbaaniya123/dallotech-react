import { SAVE_TOKEN, SAVE_USER_DETAILS, LOG_OUT } from '../constant/index';
import { SAVE_PROFILE_DATA } from '../constant';

export const saveToken = token => dispatch => {
  dispatch({
    type: SAVE_TOKEN,
    payload: token
  });
  return Promise.resolve();
};

export const saveUserDetails = token => dispatch => {
  dispatch({
    type: SAVE_USER_DETAILS,
    payload: token
  });
  return Promise.resolve();
};

export const saveProfileData = data => dispatch => {
  dispatch({
    type: SAVE_PROFILE_DATA,
    payload: data
  });
  return Promise.resolve();
};

export const logout = () => dispatch => {
  dispatch({
    type: LOG_OUT
  });
  return Promise.resolve();
};
