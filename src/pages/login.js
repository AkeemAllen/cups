import React from 'react';
import Input from '@material-ui/core/Input';
import { Button, Container } from '@material-ui/core';
import { AccountCircleOutlined, LockOutlined } from '@material-ui/icons';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import NavBar from '../components/navBar';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';

function Login() {
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [redirect, setRedirect] = React.useState(false);
  const [manager, setManager] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleUsername = event => {
    setUserName(event.target.value);
  };

  const handlePassword = event => {
    setPassword(event.target.value);
  };

  const handleSubmit = event => {
    let uri;
    process.env.NODE_ENV !== 'production'
      ? (uri = 'http://localhost:5000/users/login')
      : (uri = `${process.env.REACT_APP_MONGO_API_BASE_URI}/users/login`);
    setLoading(true);

    event.preventDefault();
    axios
      .post(uri, {
        userName: userName,
        password: password
      })
      .then(response => {
        setLoading(false);
        if (response.data.managerInfo !== undefined) {
          setManager(true);
          setRedirect(true);
        } else {
          setManager(false);
          setRedirect(true);
        }
      })
      .catch(error => {
        setLoading(false);
        throw error;
      });
  };

  if (redirect) {
    if (manager === true) {
      console.log('Entering Admin');
      return <Redirect to="/admin" />;
    }
    console.log('Entering User');
    return <Redirect to="/home" />;
  }
  return (
    <div>
      <NavBar />
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
              required={true}
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
              required={true}
            />
          </div>
          <Button type="submit" style={styles.submitBtn}>
            Submit
          </Button>
          {loading === true ? (
            <Loader
              type="ThreeDots"
              color="#a39171"
              timeout={3000}
              height={20}
              width={80}
              style={{ height: '10px' }}
            />
          ) : null}
        </form>
      </Container>
    </div>
  );
}

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
    backgroundImage: 'linear-gradient(45deg, #FDC830, #F37335)',
    color: 'white'
  },
  icon: {
    marginRight: '15px'
  }
};

export default Login;
