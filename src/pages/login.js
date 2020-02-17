import React from 'react';
import Input from '@material-ui/core/Input';
import { Button } from '@material-ui/core';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Username: '',
      Password: '',
      redirect: false,
      manager: false
    };
  }

  handleUsername = event => {
    this.setState({ Username: event.target.value });
  };

  handlePassword = event => {
    this.setState({ Password: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    axios
      .post('http://localhost:5000/users/login', {
        userName: this.state.Username,
        password: this.state.Password
      })
      .then(response => {
        if (response.data.managerInfo !== undefined) {
          this.setState({ manager: true, redirect: true });
        } else {
          this.setState({ manager: false, redirect: true });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    if (this.state.redirect) {
      if (this.state.manager === true) {
        console.log('Entering Admin');
        return <Redirect to="/admin" />;
      }
      console.log('Entering User');
      return <Redirect to="/home" />;
    }
    return (
      <div style={{ justifyContent: 'center', display: 'flex', width: '100%' }}>
        <form onSubmit={this.handleSubmit}>
          <h1>Login</h1>
          <Input
            placeholder="Username"
            value={this.state.Username}
            onChange={this.handleUsername}
          />
          <br />
          <Input
            placeholder="Password"
            value={this.state.Password}
            type="password"
            onChange={this.handlePassword}
          />
          <br />
          <Button type="submit">Submit</Button>
        </form>
      </div>
    );
  }
}
export default Login;
