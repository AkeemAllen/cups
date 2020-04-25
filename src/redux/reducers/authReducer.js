import {
  AUTH_USER,
  LOG_OUT,
  REGISTER_USER,
  AUTH_USER_FAILURE,
  REGISTER_USER_FAILURE,
  SET_NEW_USER_NULL
} from '../actions/types';

const intialState = {
  isAdmin: false,
  user: undefined,
  loginError: null,
  registrationError: null,
  newUser: null
};

export default function(state = intialState, action) {
  switch (action.type) {
    case AUTH_USER: {
      return {
        ...state,
        isAdmin: action.payload.user.isAdmin,
        user: action.payload.user,
        loginError: null
      };
    }
    case AUTH_USER_FAILURE: {
      return {
        ...state,
        loginError: action.payload.message
      };
    }
    case LOG_OUT: {
      return { ...state, isAdmin: false, user: undefined };
    }
    case REGISTER_USER: {
      return {
        ...state,
        newUser: action.payload
      };
    }
    case REGISTER_USER_FAILURE: {
      return {
        ...state,
        registrationError: action.payload
      };
    }
    case SET_NEW_USER_NULL: {
      return {
        ...state,
        newUser: null
      };
    }
    default:
      return state;
  }
}
