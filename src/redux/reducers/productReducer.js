// eslint-disable-next-line no-unused-vars
import {
  FETCH_PRODUCTS,
  NEW_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
  FETCH_ONE_PRODUCT
} from '../actions/types';

const intialState = {
  products: [],
  product: {}
};

export default function(state = intialState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        products: action.payload
      };
    case FETCH_ONE_PRODUCT: {
      return {
        ...state,
        product: action.payload
      };
    }
    case DELETE_PRODUCT: {
      state.products = state.products.filter(
        product => product._id !== action.payload
      );
      return {
        ...state,
        products: [...state.products]
      };
    }
    case NEW_PRODUCT:
      state.products.unshift(action.payload);
      return {
        ...state,
        product: action.payload
      };
    case UPDATE_PRODUCT: {
      state.products.forEach((product, index, arr) => {
        if (product._id === action.payload._id) {
          arr[index] = action.payload;
        }
      });
      return {
        ...state,
        products: [...state.products]
      };
    }
    default:
      return state;
  }
}
