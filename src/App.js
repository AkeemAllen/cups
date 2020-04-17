import React from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import { connect } from 'react-redux';
import PrivateRoute from './components/PrivateRoute';
import { bindActionCreators } from 'redux';
import { authorizeUser } from './redux/actions/authActions';
import { fetchProducts } from './redux/actions/productActions';
import UserMenu from './pages/UserMenu';
import NavBar from './components/NavBar';

class App extends React.Component {
  render() {
    return (
      <div style={{ height: '100vh' }}>
        <NavBar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/admin" component={Dashboard} />
          <Route path="/menu" component={UserMenu} />
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    products: state.products
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ authorizeUser, fetchProducts }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
