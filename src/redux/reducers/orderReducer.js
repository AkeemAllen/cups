import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  PLACE_ORDER,
  REMOVE_ALL_FROM_CART,
  CALCULATE_COST,
  FETCH_ORDERS
} from '../actions/types';

const initialState = {
  cart: [],
  product: '',
  totalCost: 0,
  orders: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_ORDERS: {
      return {
        ...state,
        orders: action.payload
      };
    }
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
      let totalCost = 0;
      state.cart.forEach(product => {
        totalCost = totalCost + parseInt(product.cost);
      });
      return {
        ...state,
        product: action.payload,
        totalCost: totalCost
      };
    }
    case PLACE_ORDER: {
      return {
        ...state,
        cart: [],
        totalCost: 0
      };
    }
    case REMOVE_ALL_FROM_CART: {
      let totalCost = 0;
      state.cart.forEach(product => {
        totalCost = totalCost + parseInt(product.cost);
      });
      return {
        ...state,
        cart: [],
        totalCost: totalCost
      };
    }
    case CALCULATE_COST: {
      state.cart.forEach((product, index, arr) => {
        if (product.product._id === action.productId) {
          arr[index].cost = action.cost;
        }
      });
      let totalCost = 0;
      state.cart.forEach(product => {
        totalCost = totalCost + parseInt(product.cost);
      });
      return {
        ...state,
        cart: [...state.cart],
        totalCost: totalCost
      };
    }
    default:
      return state;
  }
}
