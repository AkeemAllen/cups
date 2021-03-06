import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logOut } from '../redux/actions/authActions';
import { removeAllFromCart } from '../redux/actions/orderActions';
import { bindActionCreators } from 'redux';
// import SearchAppBar from './Searchbar';
import Cart from './Cart';

const styles = {
  title: {
    textAlign: 'flex-start',
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'Courgette, sans-serif',
    color: 'black'
  },
  root: {
    flexGrow: 1
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  links: {
    textDecoration: 'none',
    color: 'black',
    display: 'flex',
    alignItems: 'center'
    // flexDirection: 'column'
  },
  btn: {
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'Courgette, sans-serif'
  },
  bar: {
    display: 'flex',
    flexDirection: 'column'
  },
  appBar: {
    backgroundColor: 'white'
  }
};

class NavBar extends React.Component {
  render() {
    return (
      <div className={styles.root}>
        <AppBar position="fixed" style={styles.appBar}>
          <Toolbar style={styles.toolbar}>
            <Typography variant="h6" style={styles.title}>
              <img
                src={require('../assets/images/coffee-logo2.png')}
                width="70px"
                alt="Cups Logo"
              />
            </Typography>
            <div style={styles.content}>
              <Link to="/" style={styles.links}>
                <Button color="inherit" style={styles.btn}>
                  Home
                </Button>
                {/* <span style={{ background: 'black' }}>
                  <div style={{ width: '50px', height: '5px' }}></div>
                </span> */}
              </Link>
              <Link to="/menu" style={styles.links}>
                <Button color="inherit" style={styles.btn}>
                  Menu
                </Button>
              </Link>
              {localStorage.user !== undefined ? (
                <Button
                  onClick={() => {
                    this.props.logOut();
                    this.props.removeAllFromCart();
                  }}
                  style={styles.btn}
                >
                  Log out
                </Button>
              ) : (
                <Link to="/login" style={styles.links}>
                  <Button color="inherit" style={styles.btn}>
                    Login
                  </Button>
                </Link>
              )}
              {/* <SearchAppBar /> */}
              <Cart />
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

NavBar.propTypes = {
  logOut: PropTypes.func.isRequired,
  removeAllFromCart: PropTypes.func.isRequired,
  user: PropTypes.object
};

const mapStateToProps = state => ({
  user: state.auth.user
});

const mapDispatchToProps = dispatch => ({
  logOut: bindActionCreators(logOut, dispatch),
  removeAllFromCart: bindActionCreators(removeAllFromCart, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
