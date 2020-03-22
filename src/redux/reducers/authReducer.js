import { AUTH_USER } from '../actions/types';

const intialState = {
  isAdmin: false,
  user: null
};

export default function(state = intialState, action) {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        isAdmin: action.payload.user.isAdmin,
        user: action.payload.user
      };
    default:
      return state;
  }
}
