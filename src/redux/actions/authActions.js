import {
  AUTH_USER,
  LOG_OUT,
  REGISTER_USER,
  AUTH_USER_FAILURE,
  REGISTER_USER_FAILURE,
  SET_NEW_USER_NULL,
  UPDATE_USER_INFO
} from './types';
import { fetchAccountBalance } from './orderActions';
import axios from 'axios';
import jwt from 'jsonwebtoken';

let uri;
process.env.NODE_ENV !== 'production'
  ? (uri = 'http://localhost:5000/users/')
  : (uri = `${process.env.REACT_APP_MONGO_API_BASE_URI}/users/`);

export const authorizeUser = (userName, password) => dispatch => {
  let uri;
  process.env.NODE_ENV !== 'production'
    ? (uri = 'http://localhost:5000/users/login')
    : (uri = `${process.env.REACT_APP_MONGO_API_BASE_URI}/users/login`);

  axios
    .post(uri, {
      userName: userName,
      password: password
    })
    .then(response => {
      localStorage.setItem('token', response.data.token);
      jwt.verify(
        response.data.token,
        `${process.env.REACT_APP_JWT_SECRET}`,
        (err, decoded) => {
          if (err) throw err;
          localStorage.setItem('isAdmin', decoded.user.isAdmin);
          localStorage.setItem('user', JSON.stringify(decoded.user));
          dispatch({
            type: AUTH_USER,
            payload: decoded
          });
          dispatch(
            fetchAccountBalance(decoded.user.customerInfo.accountBalance)
          );
        }
      );
    })
    .catch(error => {
      localStorage.removeItem('token');
      localStorage.removeItem('isAdmin');
      dispatch({
        type: AUTH_USER_FAILURE,
        payload: error
      });
      throw error;
    });
};

export const logOut = () => dispatch => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  localStorage.removeItem('isAdmin');
  dispatch({
    type: LOG_OUT
  });
};

export const registerUser = (userName, password, disability) => dispatch => {
  axios
    .post(uri, {
      userName,
      password,
      customerInfo: {
        disability: disability
      }
    })
    .then(res => {
      dispatch({ type: REGISTER_USER, payload: res.data });
    })
    .catch(error => {
      dispatch({
        type: REGISTER_USER_FAILURE,
        payload: error
      });
    });
};

export const updateUser = (
  id,
  { userName, customerInfo, managerInfo }
) => dispatch => {
  axios
    .put(uri + `/update/${id}`, {
      userName,
      customerInfo,
      managerInfo
    })
    .then(response =>
      dispatch({ type: UPDATE_USER_INFO, payload: response.data })
    );
};

export const setNewUserNull = () => dispatch => {
  dispatch({ type: SET_NEW_USER_NULL });
};
