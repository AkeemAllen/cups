import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
// import Menu from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    textAlign: 'center'
  }
}));

const styles = {
  root: {
    flexGrow: 1
  },
  links: {
    textDecoration: 'none',
    color: 'white'
  }
};

export default function NavBar() {
  const classes = useStyles();

  return (
    <div className={styles.root}>
      <AppBar position="static" style={{ backgroundColor: '#ff9335' }}>
        <Toolbar>
          <Link to="/" style={styles.links}>
            <Button color="inherit">Home</Button>
          </Link>
          <Link to="/about" style={styles.links}>
            <Button color="inherit">About</Button>
          </Link>
          <Link to="/menu" style={styles.links}>
            <Button color="inherit">Menu</Button>
          </Link>
          <Typography variant="h6" className={classes.title}>
            C.U.P.S
          </Typography>
          <Link to="/contact" style={styles.links}>
            <Button color="inherit">Contact</Button>
          </Link>
          <Link to="/login" style={styles.links}>
            <Button color="inherit">Login</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
