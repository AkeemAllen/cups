import React from 'react';
import Input from '@material-ui/core/Input';
import { Button } from '@material-ui/core';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

function Login() {
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [redirect, setRedirect] = React.useState(false);
  const [manager, setManager] = React.useState(false);

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

    event.preventDefault();
    axios
      .post(uri, {
        userName: userName,
        password: password
      })
      .then(response => {
        if (response.data.managerInfo !== undefined) {
          setManager(true);
          setRedirect(true);
        } else {
          setManager(false);
          setRedirect(true);
        }
      })
      .catch(error => {
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
}
export default Login;
