import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const isAdmin = JSON.parse(localStorage.getItem('isAdmin'));

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  if (auth === true || isAdmin === true) {
    return <Route {...rest} render={props => <Component {...props} />} />;
  }
  return <Redirect to="/login" />;
};

PrivateRoute.propTypes = {
  auth: PropTypes.bool.isRequired,
  component: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth.isAdmin
});

export default connect(mapStateToProps, {})(PrivateRoute);
