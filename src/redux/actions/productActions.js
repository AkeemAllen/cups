// eslint-disable-next-line no-unused-vars
import {
  FETCH_PRODUCTS,
  NEW_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT
} from './types';
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
  axios
    .delete(uri + `/${id}`)
    .then(() => dispatch({ type: DELETE_PRODUCT, payload: id }));
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
        payload: response.data
      });
    })
    .catch(err => {
      throw err;
    });
};

export const updateProduct = (
  id,
  { name, price, quantity, category, image }
) => dispatch => {
  axios
    .put(uri + `/update/${id}`, {
      productName: name,
      category: category,
      quantity: quantity,
      price: price,
      image: image
    })
    .then(response =>
      dispatch({ type: UPDATE_PRODUCT, payload: response.data })
    );
};

export const uploadImage = (productId, formData) => dispatch => {
  let imageUploadUri;
  process.env.NODE_ENV !== 'production'
    ? (imageUploadUri = 'http://localhost:5000/upload')
    : (imageUploadUri = `${process.env.REACT_APP_MONGO_API_BASE_URI}/upload`);

  axios
    .post(imageUploadUri, formData)
    .then(res => {
      dispatch(updateProduct(productId, { image: res.data.file.filename }));
    })
    .catch(err => {
      throw err;
    });
};

export const reduceStock = (productId, quantity, currentStock) => dispatch => {
  // Get the Current Amount of stock
  const newQuantity = currentStock - quantity;
  dispatch(updateProduct(productId, { quantity: newQuantity }));
};
