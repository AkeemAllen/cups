import React from 'react';
import Input from '@material-ui/core/Input';
import { Button } from '@material-ui/core';
import axios from 'axios';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Username: '',
      Password: ''
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
      .post('https://mysterious-caverns-49185.herokuapp.com/users/login', {
        userName: this.state.Username,
        password: this.state.Password
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
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
