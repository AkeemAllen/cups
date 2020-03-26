import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  ListItemText,
  ListItemIcon,
  ListItem,
  Divider,
  Typography,
  List,
  Toolbar,
  Drawer,
  AppBar,
  CssBaseline
} from '@material-ui/core';
import Table from '../components/table';
import Modal from '../components/modal';
import NavBar from '../components/navBar';
import { Inbox, Mail, Home } from '@material-ui/icons';
import { Redirect } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  toolbar: theme.mixins.toolbar
}));

function Dashboard() {
  const classes = useStyles();
  const [redirect, setRedirect] = React.useState(false);

  if (redirect) {
    // setRedirect(false);
    return <Redirect to="/" />;
  }

  return (
    <div>
      <NavBar />
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" noWrap>
              Administrator Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.toolbar} />
          <List>
            <ListItem button onClick={() => setRedirect(true)}>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            {['Inventory'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <Inbox /> : <Mail />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Table />
          <Modal />
        </main>
      </div>
    </div>
  );
}

// const mapStateToProps = state => ({
//   auth: state.auth.admin
// });

export default Dashboard;
