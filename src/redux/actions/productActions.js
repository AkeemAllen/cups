// eslint-disable-next-line no-unused-vars
import { FETCH_PRODUCTS, NEW_PRODUCT, DELETE_PRODUCT } from './types';
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
export const deleteProduct = id => dispatch => {
  axios.delete(uri + `/${id}`).then(() => dispatch({ type: DELETE_PRODUCT }));
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
      });
      response.status === 200
        ? alert('Product Added')
        : alert('Error Occurred');
    })
    .catch(err => {
      throw err;
    });
};
