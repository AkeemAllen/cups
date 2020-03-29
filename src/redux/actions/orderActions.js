import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  PLACE_ORDER,
  REMOVE_ALL_FROM_CART
} from './types';
import axios from 'axios';

let uri;
process.env.NODE_ENV !== 'production'
  ? (uri = 'http://localhost:5000/orders')
  : (uri = `${process.env.REACT_APP_MONGO_API_BASE_URI}/orders`);

export const addToCart = productId => dispatch => {
  dispatch({ type: ADD_TO_CART, payload: productId });
};

export const removeFromCart = productId => dispatch => {
  dispatch({ type: REMOVE_FROM_CART, payload: productId });
};

export const placeOrder = cart => dispatch => {
  axios.post(uri, { user: 'sdjf', products: cart });
};

export const removeAllFromCart = () => dispatch => {
  dispatch({ type: REMOVE_ALL_FROM_CART });
};
