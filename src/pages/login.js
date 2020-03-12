import React from 'react';
import Input from '@material-ui/core/Input';
import { Button, Container } from '@material-ui/core';
import { AccountCircleOutlined, LockOutlined } from '@material-ui/icons';
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
    if (props.auth === true) {
      return <Redirect to="/admin" />;
    }
    return <Redirect to="/home" />;
  }
  return (
    <Container
      style={{
        justifyContent: 'center',
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        height: '100vh'
      }}
      maxWidth="sm"
    >
      <form onSubmit={handleSubmit} style={styles.form}>
        <h1 style={styles.header}>Login</h1>
        <div style={styles.input}>
          <AccountCircleOutlined fontSize="small" style={styles.icon} />
          <Input
            placeholder="Username"
            value={userName}
            onChange={handleUsername}
            disableUnderline={true}
          />
        </div>
        <div style={styles.input}>
          <LockOutlined fontSize="small" style={styles.icon} />
          <Input
            placeholder="Password"
            value={password}
            type="password"
            onChange={handlePassword}
            disableUnderline={true}
          />
        </div>
        <Button type="submit" style={styles.submitBtn}>
          Submit
        </Button>
      </form>
    </Container>
  );
};

Login.propTypes = {
  authorizeUser: PropTypes.func.isRequired,
  auth: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth.admin
});

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    padding: '100px',
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0px 0px 9px 0px rgba(0,0,0,0.7)'
  },
  header: {
    display: 'flex',
    justifyContent: 'center'
  },
  input: {
    display: 'flex',
    marginBottom: '20px',
    alignItems: 'center',
    borderRadius: '20px',
    backgroundColor: '#ccc5b9',
    paddingRight: '15px',
    paddingLeft: '15px'
  },
  submitBtn: {
    marginTop: '20px',
    backgroundImage: 'linear-gradient(45deg, #8e2de2, #4a00e0)',
    color: 'white'
  },
  icon: {
    marginRight: '15px'
  }
};

export default connect(mapStateToProps, { authorizeUser })(Login);
