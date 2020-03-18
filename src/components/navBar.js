import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Divider
} from '@material-ui/core';
import { Link } from 'react-router-dom';
// import SearchAppBar from '../components/searchbar';

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    textAlign: 'flex-start'
  }
}));

const styles = {
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

export default function NavBar() {
  const classes = useStyles();

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
          <Typography variant="h6" className={classes.title}>
            C.U.P.S
          </Typography>
          <div style={styles.content}>
            <Link to="/" style={styles.links}>
              <Button color="inherit">Home</Button>
            </Link>
            <Link to="/menu" style={styles.links}>
              <Button color="inherit">Menu</Button>
            </Link>
            <Link to="/login" style={styles.links}>
              <Button color="inherit">Login</Button>
            </Link>
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
              width: '65%'
            }}
          />
        </div>
      </AppBar>
    </div>
  );
}
