import { ADD_TO_CART } from '../actions/types';

const initialState = {
  cart: ['test'],
  product: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART: {
      const productId = action.payload;
      state.cart.push(productId);
      return {
        ...state,
        product: action.payload
      };
    }
    default:
      return state;
  }
}
