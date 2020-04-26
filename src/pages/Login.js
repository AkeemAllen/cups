import React from 'react';
import { Button, Container, Input } from '@material-ui/core';
import { AccountCircleOutlined, LockOutlined } from '@material-ui/icons';
import { Redirect, Link } from 'react-router-dom';
import { authorizeUser } from '../redux/actions/authActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { FormErrors } from '../components/FormErrors';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      redirect: false,
      formErrors: { password: '', userName: '' },
      usernameValid: false,
      passwordValid: false,
      formValid: false
    };
  }

  handleChange = event => {
    event.preventDefault();
    const { name, value } = event.target;

    this.setState(
      {
        [name]: value
      },
      () => {
        this.validateField(name, value);
      }
    );
  };

  validateField = (fieldName, value) => {
    const fieldValidationErrors = this.state.formErrors;
    let passwordValid = this.state.passwordValid;
    let usernameValid = this.state.usernameValid;
    let something = '';

    switch (fieldName) {
      case 'userName': {
        usernameValid = value.length >= 3;
        fieldValidationErrors.username = usernameValid
          ? ''
          : 'Name is too short';
        break;
      }
      case 'password': {
        passwordValid = value.length >= 3;
        fieldValidationErrors.passwordValid = passwordValid
          ? ''
          : 'Password is too short';
        break;
      }
      default: {
        something = 'Just needed a default case lol';
        // eslint-disable-next-line no-console
        console.log(something);
        break;
      }
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        passwordValid: passwordValid,
        usernameValid: usernameValid
      },
      this.validateForm
    );
  };

  validateForm = () => {
    this.setState({
      formValid: this.state.usernameValid && this.state.passwordValid
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { userName, password } = this.state;
    this.props.authorizeUser(userName, password);
  };

  render() {
    const { userName, password, formErrors, formValid } = this.state;
    const { auth, user, loginError } = this.props;

    if (user !== undefined) {
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
          {loginError !== null ? (
            <div style={{ color: 'red', margin: 'auto' }}>User Not Found</div>
          ) : null}
          <FormErrors formErrors={formErrors} />
          <div style={styles.input}>
            <AccountCircleOutlined fontSize="small" style={styles.icon} />
            <Input
              placeholder="Username"
              value={userName}
              name="userName"
              onChange={this.handleChange}
              disableUnderline={true}
            />
          </div>
          <div style={styles.input}>
            <LockOutlined fontSize="small" style={styles.icon} />
            <Input
              placeholder="Password"
              value={password}
              name="password"
              type="password"
              onChange={this.handleChange}
              disableUnderline={true}
            />
          </div>
          <Button type="submit" style={styles.submitBtn} disabled={!formValid}>
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
  user: PropTypes.object,
  loginError: PropTypes.string
};

const mapStateToProps = state => ({
  auth: state.auth.isAdmin,
  user: state.auth.user,
  loginError: state.auth.loginError
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
  },
  modalMessage: {
    display: 'flex',
    flexDirection: 'column',
    padding: '30px',
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0px 0px 9px 0px rgba(0,0,0,0.7)'
  },
  modal: {
    justifyContent: 'center',
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    height: '100vh'
  }
};
