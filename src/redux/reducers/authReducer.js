import {
  AUTH_USER,
  LOG_OUT,
  REGISTER_USER,
  AUTH_USER_FAILURE
} from '../actions/types';

const intialState = {
  isAdmin: false,
  user: undefined,
  error: null
};

export default function(state = intialState, action) {
  switch (action.type) {
    case AUTH_USER: {
      return {
        ...state,
        isAdmin: action.payload.user.isAdmin,
        user: action.payload.user,
        error: null
      };
    }
    case AUTH_USER_FAILURE: {
      return {
        ...state,
        error: action.payload.message
      };
    }
    case LOG_OUT: {
      return { ...state, isAdmin: false, user: undefined };
    }
    case REGISTER_USER: {
      return {
        ...state
        // user: action.payload
      };
    }
    default:
      return state;
  }
}
