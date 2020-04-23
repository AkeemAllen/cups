import React from 'react';
import Input from '@material-ui/core/Input';
import { Button, Container, Backdrop, Modal } from '@material-ui/core';
import { AccountCircleOutlined, LockOutlined } from '@material-ui/icons';
import { registerUser } from '../redux/actions/authActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      disability: '',
      redirect: false,
      open: true
    };
  }

  handleOpen = event => {
    this.setState({ open: true });
  };

  handleClose = event => {
    this.setState({ open: false });
  };

  handleUsername = event => {
    this.setState({ userName: event.target.value });
  };

  handlePassword = event => {
    this.setState({ password: event.target.value });
  };

  handleDisability = event => {
    this.setState({ disability: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { userName, password, disability } = this.state;
    this.props.registerUser(userName, password, disability);
    this.setState({ open: true });
  };

  render() {
    const { userName, password, disability, open } = this.state;
    // const { user } = this.props;

    // if (user !== undefined && user.isAdmin === false) {
    //   this.handleOpen();
    // }
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
          <div style={styles.input}>
            <LockOutlined fontSize="small" style={styles.icon} />
            <Input
              placeholder="Disability"
              value={disability}
              onChange={this.handleDisability}
              disableUnderline={true}
            />
          </div>
          <Button
            type="submit"
            style={styles.submitBtn}
            disabled={
              userName === '' ||
              password === '' ||
              userName == null ||
              password == null ||
              disability === '' ||
              disability == null
            }
          >
            Submit
          </Button>
        </form>
        <Modal
          style={styles.modal}
          open={open}
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
  auth: PropTypes.bool.isRequired,
  user: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.auth.isAdmin,
  user: state.auth.user
});

const mapDispatchToProps = dispatch => ({
  registerUser: bindActionCreators(registerUser, dispatch)
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
