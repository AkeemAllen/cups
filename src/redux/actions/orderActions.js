import { ADD_TO_CART } from './types';

export const addToCart = productId => dispatch => {
  dispatch({ type: ADD_TO_CART, payload: productId });
};
