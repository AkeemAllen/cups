/* eslint-disable no-lone-blocks */
import React from 'react';
import Input from '@material-ui/core/Input';
import { Button, Container, Backdrop, Modal } from '@material-ui/core';
import {
  AccountCircleOutlined,
  LockOutlined,
  AccessibleOutlined
} from '@material-ui/icons';
import { registerUser, setNewUserNull } from '../redux/actions/authActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { FormErrors } from '../components/FormErrors';

class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      disability: '',
      usernameValid: false,
      passwordValid: false,
      disabilityValid: false,
      formErrors: { userName: '', password: '', disability: '' },
      formValid: false,
      redirect: false,
      open: false
    };
  }

  handleOpen = event => {
    this.setState({ open: true });
  };

  handleClose = event => {
    this.props.setNewUserNull();
  };

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
    let disabilityValid = this.state.disabilityValid;
    let usernameValid = this.state.usernameValid;

    switch (fieldName) {
      case 'userName':
        {
          usernameValid = value.length >= 3;
          fieldValidationErrors.userName = usernameValid
            ? ''
            : 'Name is too short';
        }
        break;
      case 'password':
        {
          passwordValid = value.length >= 6;
          fieldValidationErrors.password = passwordValid
            ? ''
            : 'Password is too short';
        }
        break;
      case 'disability':
        {
          disabilityValid = value.length >= 3;
          fieldValidationErrors.disability = disabilityValid
            ? ''
            : 'Disability is too short';
        }
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        passwordValid: passwordValid,
        usernameValid: usernameValid,
        disabilityValid: disabilityValid
      },
      this.validateForm
    );
  };

  validateForm = () => {
    this.setState({
      formValid:
        this.state.usernameValid &&
        this.state.passwordValid &&
        this.state.disabilityValid
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { userName, password, disability } = this.state;
    this.props.registerUser(userName, password, disability);
    this.setState({ open: true });
  };

  render() {
    const {
      userName,
      password,
      disability,
      formErrors,
      formValid
    } = this.state;
    const { registrationError, newUser } = this.props;

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
          <h1 style={styles.header}>Register</h1>
          {registrationError !== null ? (
            <div style={{ color: 'red', margin: 'auto' }}>
              Registration Failed
            </div>
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
              type="password"
              name="password"
              onChange={this.handleChange}
              disableUnderline={true}
            />
          </div>
          <div style={styles.input}>
            <AccessibleOutlined fontSize="small" style={styles.icon} />
            <Input
              placeholder="Disability"
              value={disability}
              name="disability"
              onChange={this.handleChange}
              disableUnderline={true}
            />
          </div>
          <Button type="submit" style={styles.submitBtn} disabled={!formValid}>
            Submit
          </Button>
        </form>
        <Modal
          style={styles.modal}
          open={newUser !== null}
          onClose={this.handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500
          }}
        >
          <div style={styles.modalMessage}>
            <h3> Registered </h3>
            <h5> You can now proceed to login! </h5>
          </div>
        </Modal>
      </Container>
    );
  }
}

Registration.propTypes = {
  registerUser: PropTypes.func.isRequired,
  setNewUserNull: PropTypes.func.isRequired,
  auth: PropTypes.bool.isRequired,
  newUser: PropTypes.object,
  registrationError: PropTypes.string
};

const mapStateToProps = state => ({
  auth: state.auth.isAdmin,
  newUser: state.auth.newUser,
  registrationError: state.auth.registrationError
});

const mapDispatchToProps = dispatch => ({
  registerUser: bindActionCreators(registerUser, dispatch),
  setNewUserNull: bindActionCreators(setNewUserNull, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Registration);

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
