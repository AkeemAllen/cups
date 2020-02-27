import { AUTH_USER } from '../actions/types';

const intialState = {
  admin: false,
  user: {
    userName: '',
    password: ''
  }
};

export default function(state = intialState, action) {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        admin: action.payload.user.isAdmin
      };
    default:
      return state;
  }
}
