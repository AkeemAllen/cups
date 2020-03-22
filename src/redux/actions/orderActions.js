import { ADD_TO_CART, REMOVE_FROM_CART } from './types';

export const addToCart = productId => dispatch => {
  dispatch({ type: ADD_TO_CART, payload: productId });
};

export const removeFromCart = productId => dispatch => {
  dispatch({ type: REMOVE_FROM_CART, payload: productId });
};
