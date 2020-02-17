import React from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from './pages/login';
import Home from './pages/Home';
import NavBar from './components/navBar';
import About from './pages/About';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/about" exact component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/admin" component={Dashboard} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
