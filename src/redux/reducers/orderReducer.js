import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  PLACE_ORDER,
  REMOVE_ALL_FROM_CART,
  CALCULATE_COST
} from '../actions/types';

const initialState = {
  cart: [],
  product: '',
  totalCost: 0
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      state.cart.push({
        product: action.productId,
        quantity: action.quantity
      });
      return {
        ...state,
        cart: [...state.cart]
      };
    case REMOVE_FROM_CART: {
      const cart = state.cart.filter(
        product => product.product._id !== action.payload
      );
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
    case CALCULATE_COST: {
      state.cart.forEach((product, index, arr) => {
        if (product.product._id === action.productId) {
          arr[index].cost = action.cost;
        }
      });
      return {
        ...state,
        cart: [...state.cart]
      };
    }
    default:
      return state;
  }
}
