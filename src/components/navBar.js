import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logOut } from '../redux/actions/authActions';
import { removeAllFromCart } from '../redux/actions/orderActions';
import { bindActionCreators } from 'redux';
import SearchAppBar from '../components/Searchbar';

const styles = {
  title: {
    textAlign: 'flex-start'
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
  },
  appBar: {
    backgroundColor: '#316e8f'
  }
};

class NavBar extends React.Component {
  render() {
    return (
      <div className={styles.root}>
        <AppBar position="sticky" style={styles.appBar}>
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
              <SearchAppBar />
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
