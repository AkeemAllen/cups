// eslint-disable-next-line no-unused-vars
import { FETCH_PRODUCTS, NEW_PRODUCT, DELETE_PRODUCT } from '../actions/types';

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
    case DELETE_PRODUCT:
      return {
        ...state
      };
    case NEW_PRODUCT:
      return {
        ...state
      };
    default:
      return state;
  }
}
