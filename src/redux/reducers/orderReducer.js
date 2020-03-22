import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  PLACE_ORDER,
  REMOVE_ALL_FROM_CART
} from '../actions/types';

const initialState = {
  cart: [],
  product: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      state.cart.push(action.payload);
      return {
        ...state,
        cart: [...state.cart]
      };
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
    case REMOVE_ALL_FROM_CART: {
      return {
        ...state,
        cart: []
      };
    }
    default:
      return state;
  }
}
