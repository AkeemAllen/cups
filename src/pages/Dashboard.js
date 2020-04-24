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
  CssBaseline,
  Button
} from '@material-ui/core';
import Table from '../components/Table';
import { Inbox, Mail, Home } from '@material-ui/icons';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOut } from '../redux/actions/authActions';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import Analytics from '../components/Analytics';

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

function Dashboard(props) {
  const classes = useStyles();
  const [redirect, setRedirect] = React.useState(false);
  const [currentComponent, setCurrentComponent] = React.useState('Inventory');

  if (redirect) {
    return <Redirect to="/" />;
  }

  const changeComponent = componentName => {
    setCurrentComponent(componentName);
  };

  return (
    <div>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar style={{ justifyContent: 'space-between' }}>
            <Typography variant="h6" noWrap>
              Administrator Dashboard
            </Typography>
            <Button style={{ color: 'white' }} onClick={() => props.logOut()}>
              Log Out
            </Button>
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
            {['Inventory', 'Analytics'].map((text, index) => (
              <ListItem button key={text} onClick={() => changeComponent(text)}>
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
          {currentComponent === 'Inventory' ? <Table /> : null}
          {currentComponent === 'Analytics' ? <Analytics /> : null}
        </main>
      </div>
    </div>
  );
}

Dashboard.propTypes = {
  logOut: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  logOut: bindActionCreators(logOut, dispatch)
});

export default connect(null, mapDispatchToProps)(Dashboard);
