import { AUTH_USER } from './types';

import axios from 'axios';
import jwt from 'jsonwebtoken';

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
          dispatch({
            type: AUTH_USER,
            payload: decoded
          });
        }
      );
    })
    .catch(error => {
      localStorage.removeItem('token');
      localStorage.removeItem('isAdmin');
      throw error;
    });
};