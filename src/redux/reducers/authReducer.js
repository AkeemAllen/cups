import { AUTH_USER, LOG_OUT, REGISTER_USER } from '../actions/types';

const intialState = {
  isAdmin: false,
  user: undefined
};

export default function(state = intialState, action) {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        isAdmin: action.payload.user.isAdmin,
        user: action.payload.user
      };
    case LOG_OUT:
      return { ...state, isAdmin: false, user: undefined };
    case REGISTER_USER: {
      return {
        ...state,
        user: action.payload
      };
    }
    default:
      return state;
  }
}
