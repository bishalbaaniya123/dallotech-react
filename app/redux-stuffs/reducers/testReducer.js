import { TEST_ACTION } from '../constant/index';

export const testReducer = (state = null, action) => {
  switch (action.type) {
    case TEST_ACTION:
      return state;
    default:
      return state;
  }
};
