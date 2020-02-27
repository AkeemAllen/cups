import React from 'react';
import Input from '@material-ui/core/Input';
import { Button } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { authorizeUser } from '../redux/actions/authActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Login = props => {
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [redirect, setRedirect] = React.useState(false);

  const handleUsername = event => {
    setUserName(event.target.value);
  };

  const handlePassword = event => {
    setPassword(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    props.authorizeUser(userName, password);
    setRedirect(true);
  };

  if (redirect) {
    console.log(props.auth);
    if (props.auth === true) {
      console.log('Entering Admin');
      return <Redirect to="/admin" />;
    }
    console.log('Entering User');
    return <Redirect to="/home" />;
  }
  return (
    <div style={{ justifyContent: 'center', display: 'flex', width: '100%' }}>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <Input
          placeholder="Username"
          value={userName}
          onChange={handleUsername}
        />
        <br />
        <Input
          placeholder="Password"
          value={password}
          type="password"
          onChange={handlePassword}
        />
        <br />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

Login.propTypes = {
  authorizeUser: PropTypes.func.isRequired,
  auth: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth.admin
});

export default connect(mapStateToProps, { authorizeUser })(Login);
