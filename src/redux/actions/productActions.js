// eslint-disable-next-line no-unused-vars
import { FETCH_PRODUCTS, NEW_PRODUCT } from './types';
import axios from 'axios';
let uri;
  process.env.NODE_ENV !== 'production'
    ? (uri = 'http://localhost:5000/products')
    : (uri = `${process.env.REACT_APP_MONGO_API_BASE_URI}/products`);

export const fetchProducts = () => dispatch => {
  fetch(uri)
    .then(res => res.json())
    .then(products =>
      dispatch({
        type: FETCH_PRODUCTS,
        payload: products
      })
    );
};

export const newProduct = (name, price, quantity, category) => dispatch => {
  axios
      .post(uri, {
        productName: name,
        category: category,
        quantity: quantity,
        price: price
      })
      .then(response => {
        dispatch({
          type: NEW_PRODUCT,
          payload: response
        })
      })
      .catch(err => {
        throw err;
      });
}