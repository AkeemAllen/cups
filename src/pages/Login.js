import React from 'react';
import Input from '@material-ui/core/Input';
import { Button, Container } from '@material-ui/core';
import { AccountCircleOutlined, LockOutlined } from '@material-ui/icons';
import { Redirect, Link } from 'react-router-dom';
import { authorizeUser } from '../redux/actions/authActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      redirect: false
    };
  }

  handleUsername = event => {
    this.setState({ userName: event.target.value });
  };

  handlePassword = event => {
    this.setState({ password: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { userName, password } = this.state;
    this.props.authorizeUser(userName, password);
  };

  render() {
    const { userName, password } = this.state;
    const { auth, user } = this.props;

    if (user !== null) {
      if (auth) {
        return <Redirect to="/admin" />;
      }
      return <Redirect to="/menu" />;
    }

    return (
      <Container
        style={{
          justifyContent: 'center',
          display: 'flex',
          width: '100%',
          alignItems: 'center'
        }}
        maxWidth="sm"
      >
        <form onSubmit={this.handleSubmit} style={styles.form}>
          <h1 style={styles.header}>Login</h1>
          <div style={styles.input}>
            <AccountCircleOutlined fontSize="small" style={styles.icon} />
            <Input
              placeholder="Username"
              value={userName}
              onChange={this.handleUsername}
              disableUnderline={true}
            />
          </div>
          <div style={styles.input}>
            <LockOutlined fontSize="small" style={styles.icon} />
            <Input
              placeholder="Password"
              value={password}
              type="password"
              onChange={this.handlePassword}
              disableUnderline={true}
            />
          </div>
          <Button
            type="submit"
            style={styles.submitBtn}
            disabled={
              userName === '' ||
              password === '' ||
              userName === null ||
              password === null
            }
          >
            Submit
          </Button>
          <Link to="/register" style={{ marginTop: '20px' }}>
            Not Registered? Register Here.
          </Link>
        </form>
      </Container>
    );
  }
}

Login.propTypes = {
  authorizeUser: PropTypes.func.isRequired,
  auth: PropTypes.bool.isRequired,
  user: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.auth.isAdmin,
  user: state.auth.user
});

const mapDispatchToProps = dispatch => ({
  authorizeUser: bindActionCreators(authorizeUser, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    padding: '100px',
    backgroundColor: 'white'
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    fontFamily: 'Courgette, sans-serif'
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
    background: '#e35b2d',
    color: 'white',
    borderRadius: '25px'
  },
  icon: {
    marginRight: '15px'
  }
};
