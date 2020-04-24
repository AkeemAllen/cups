import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  PLACE_ORDER,
  REMOVE_ALL_FROM_CART,
  CALCULATE_COST,
  FETCH_ORDERS
} from './types';
import axios from 'axios';

let uri;
process.env.NODE_ENV !== 'production'
  ? (uri = 'http://localhost:5000/orders')
  : (uri = `${process.env.REACT_APP_MONGO_API_BASE_URI}/orders`);

export const fetchOrders = () => dispatch => {
  fetch(uri)
    .then(res => res.json())
    .then(orders =>
      dispatch({
        type: FETCH_ORDERS,
        payload: orders
      })
    );
};

export const addToCart = (productId, quantity) => dispatch => {
  dispatch({ type: ADD_TO_CART, productId, quantity });
};

export const calculateCost = (
  productId,
  productPrice,
  productAmount
) => dispatch => {
  const cost = productAmount * productPrice;
  dispatch({ type: CALCULATE_COST, cost, productId });
};

export const removeFromCart = productId => dispatch => {
  dispatch({ type: REMOVE_FROM_CART, payload: productId });
};

export const placeOrder = (user, cart, cost) => dispatch => {
  axios
    .post(uri, { userId: user._id, products: cart, cost })
    .then(response => {
      dispatch({ type: PLACE_ORDER, payload: response.data });
    })
    .catch(err => {
      throw err;
    });
};

export const removeAllFromCart = () => dispatch => {
  dispatch({ type: REMOVE_ALL_FROM_CART });
};
