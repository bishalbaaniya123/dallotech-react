import { TOKEN_SAVE } from '../../actions/actionConstants';

const selfReducers = (state = null, action) => {
  console.log("this is self reducers being called");
  switch (action.type) {
    case TOKEN_SAVE:
      console.log("this is TOKEN_SAVE from reducer", action);
      return {
        ...state,
        profile: action.payload
      };
    default:
      return state;
  }
};

export default selfReducers;
