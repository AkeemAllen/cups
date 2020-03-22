import { ADD_TO_CART, REMOVE_FROM_CART, PLACE_ORDER } from '../actions/types';

const initialState = {
  cart: [],
  product: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART: {
      const cart = state.cart;
      cart.push(action.payload);
      state.cart = cart;
      return {
        ...state,
        product: action.payload
      };
    }
    case REMOVE_FROM_CART: {
      const cart = state.cart.filter(product => product._id !== action.payload);
      state.cart = cart;
      return {
        ...state,
        product: action.payload
      };
    }
    case PLACE_ORDER: {
      return {
        ...state
      };
    }
    default:
      return state;
  }
}
