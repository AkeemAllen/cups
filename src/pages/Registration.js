import React from 'react';
import Input from '@material-ui/core/Input';
import { Button, Container } from '@material-ui/core';
import { AccountCircleOutlined, LockOutlined } from '@material-ui/icons';
import { Redirect } from 'react-router-dom';
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
      redirect: false
    };
  }

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
  };

  render() {
    const { userName, password, disability } = this.state;
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
          alignItems: 'center',
          height: '100vh'
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
    color: 'white',
    borderRadius: '25px'
  },
  icon: {
    marginRight: '15px'
  }
};
