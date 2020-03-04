import { TEST_ACTION } from '../constant/index';

export const testAction = test => {
  return {
    type: TEST_ACTION,
    payload: test,
  };
};
