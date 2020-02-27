// eslint-disable-next-line no-unused-vars
import { FETCH_PRODUCTS, NEW_PRODUCT } from './types';
// import axios from 'axios';

export const fetchProducts = () => dispatch => {
  let uri;
  process.env.NODE_ENV !== 'production'
    ? (uri = 'http://localhost:5000/products')
    : (uri = `${process.env.REACT_APP_MONGO_API_BASE_URI}/products`);

  fetch(uri)
    .then(res => res.json())
    .then(products =>
      dispatch({
        type: FETCH_PRODUCTS,
        payload: products
      })
    );
};
