import { LOG_OUT, SAVE_PROFILE_DATA, SAVE_TOKEN, SAVE_USER_DETAILS } from '../constant/index';

export const authReducer = (state = {profile: null, token: null}, action) => {
  switch (action.type) {
    case SAVE_TOKEN:
      return {...state, token: action.payload};
    case SAVE_USER_DETAILS:
      return {...state, profile: action.payload};
    case SAVE_PROFILE_DATA:
      return {...state, profileData: action.payload};
    case LOG_OUT:
      return {...state, profile: null, token: null};
    default:
      return state;
  }
};
