import { combineReducers } from 'redux';
import authReducer from './authReducer';
import productReducer from './productReducer';
import orderReducer from './orderReducer';

export default combineReducers({
  auth: authReducer,
  products: productReducer,
  orders: orderReducer
});
