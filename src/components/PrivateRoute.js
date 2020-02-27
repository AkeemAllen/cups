import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const auth = true;

const PrivateRoute = (props, { component: Component, ...rest }) => {
  console.log(props.auth);
  if (auth === true) {
    return <Route {...rest} render={props => <Component {...props} />} />;
  }
  return <Redirect to="/login" />;
};

PrivateRoute.propTypes = {
  auth: PropTypes.bool.isRequired,
  component: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth.admin
});

export default connect(mapStateToProps, {})(PrivateRoute);
