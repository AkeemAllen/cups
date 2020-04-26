import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  PLACE_ORDER,
  REMOVE_ALL_FROM_CART,
  CALCULATE_COST,
  FETCH_ORDERS,
  PLACE_ORDER_FAILURE,
  FETCH_ACCOUNT_BALANCE
} from './types';
import axios from 'axios';
import { updateProduct } from './productActions';
// import { updateUser } from './authActions';

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

export const fetchAccountBalance = accountBalance => dispatch => {
  dispatch({
    type: FETCH_ACCOUNT_BALANCE,
    payload: accountBalance
  });
};

export const calculateCost = (
  productId,
  productPrice,
  productAmount,
  accountBalance
) => dispatch => {
  const cost = productAmount * productPrice;
  dispatch({ type: CALCULATE_COST, cost, productId, accountBalance });
};

export const removeFromCart = productId => dispatch => {
  dispatch({ type: REMOVE_FROM_CART, payload: productId });
};

export const placeOrder = (user, cart, cost) => dispatch => {
  if (user.customerInfo.accountBalance < cost) {
    dispatch({
      type: PLACE_ORDER_FAILURE,
      payload: 'account balance too low'
    });
  } else {
    axios
      .post(uri, { userId: user._id, products: cart, cost })
      .then(response => {
        // Reduct Stock
        cart.forEach(product => {
          const reducedStock = product.product.quantity - product.quantity;
          dispatch(
            updateProduct(product.product._id, { quantity: reducedStock })
          );
        });
        dispatch({ type: PLACE_ORDER, payload: response.data });
      })
      .catch(err => {
        throw err;
      });
  }
};

export const removeAllFromCart = () => dispatch => {
  dispatch({ type: REMOVE_ALL_FROM_CART });
};
