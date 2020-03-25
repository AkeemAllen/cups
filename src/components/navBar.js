import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Divider
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logOut } from '../redux/actions/authActions';
import { removeAllFromCart } from '../redux/actions/orderActions';
// import SearchAppBar from '../components/searchbar';

const styles = {
  title: {
    textAlign: 'flex-start'
  },
  root: {
    flexGrow: 1
    // display: 'flex',
    // justifyContent: 'center'
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 300px'
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    width: '20%',
    justifyContent: 'space-between'
  },
  links: {
    textDecoration: 'none',
    color: 'white'
  },
  bar: {
    display: 'flex',
    flexDirection: 'column'
  }
};

class NavBar extends React.Component {
  render() {
    return (
      <div className={styles.root}>
        <AppBar
          position="absolute"
          style={{
            display: 'flex',
            boxShadow: 'none',
            justifyContent: 'center',
            background: 'transparent'
          }}
        >
          <Toolbar style={styles.toolbar}>
            <Typography variant="h6" style={styles.title}>
              C.U.P.S
            </Typography>
            <div style={styles.content}>
              <Link to="/" style={styles.links}>
                <Button color="inherit">Home</Button>
              </Link>
              <Link to="/menu" style={styles.links}>
                <Button color="inherit">Menu</Button>
              </Link>
              {localStorage.user !== undefined ? (
                <Button
                  color="inherit"
                  onClick={() => {
                    this.props.logOut();
                    this.props.removeAllFromCart();
                  }}
                >
                  Log out
                </Button>
              ) : (
                <Link to="/login" style={styles.links}>
                  <Button color="inherit">Login</Button>
                </Link>
              )}
              {/* <SearchAppBar /> */}
            </div>
          </Toolbar>
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <Divider
              variant="middle"
              style={{
                backgroundImage:
                  'linear-gradient(-90deg,rgba(255,255,255,0) 0,#fff 5%,#fff 90%,rgba(255,255,255,0) 100%)',
                display: 'block',
                height: '2px',
                opacity: '.08',
                width: '70%'
              }}
            />
          </div>
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

export default connect(mapStateToProps, { logOut, removeAllFromCart })(NavBar);
