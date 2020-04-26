import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  PLACE_ORDER,
  REMOVE_ALL_FROM_CART,
  CALCULATE_COST,
  FETCH_ORDERS,
  PLACE_ORDER_FAILURE,
  FETCH_ACCOUNT_BALANCE
} from '../actions/types';

const initialState = {
  cart: [],
  product: '',
  totalCost: 0,
  orders: [],
  canAfford: true,
  accountBalance: 0,
  error: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_ACCOUNT_BALANCE: {
      return {
        ...state,
        accountBalance: action.payload
      };
    }
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
      const canAfford = state.accountBalance < totalCost;
      return {
        ...state,
        product: action.payload,
        totalCost: totalCost,
        canAfford: !canAfford
      };
    }
    case PLACE_ORDER: {
      let newBalance = 0;
      newBalance = state.accountBalance - state.totalCost;
      return {
        ...state,
        cart: [],
        totalCost: 0,
        accountBalance: newBalance
      };
    }
    case PLACE_ORDER_FAILURE: {
      return {
        ...state,
        error: action.payload
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
      const canAfford = state.accountBalance < totalCost;
      return {
        ...state,
        cart: [...state.cart],
        totalCost: totalCost,
        canAfford: !canAfford
      };
    }
    default:
      return state;
  }
}
