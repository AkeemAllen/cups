import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import SearchAppBar from '../components/searchbar';
// import Menu from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    // flexGrow: 1,
    textAlign: 'flex-start'
    // marginleft: '20px'
  }
}));

const styles = {
  root: {
    flexGrow: 1
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 200px'
  },
  content: {
    display: 'flex',
    flexDirection: 'row'
  },
  links: {
    textDecoration: 'none',
    color: 'black'
  }
};

export default function NavBar() {
  const classes = useStyles();

  return (
    <div className={styles.root}>
      <AppBar
        position="static"
        color="transparent"
        style={{ boxShadow: 'none', justifyContent: 'center' }}
      >
        <Toolbar style={styles.toolbar}>
          <Typography variant="h6" className={classes.title}>
            C.U.P.S
          </Typography>
          <div style={styles.content}>
            <Link to="/" style={styles.links}>
              <Button color="inherit">Home</Button>
            </Link>
            {/* <Link to="/about" style={styles.links}>
            <Button color="inherit">About</Button>
          </Link> */}
            <Link to="/menu" style={styles.links}>
              <Button color="inherit">Menu</Button>
            </Link>
            {/* <Link to="/contact" style={styles.links}>
            <Button color="inherit">Contact</Button>
          </Link> */}
            <Link to="/login" style={styles.links}>
              <Button color="inherit">Login</Button>
            </Link>
            <SearchAppBar />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
