import React from 'react';
import greatnessGif from './assets/images/greatness.gif';
import Button from '@material-ui/core/Button';
import './App.css';
import Login from './pages/login';
import Home from './pages/Home';
import {BrowserRouter, Route} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <Route path='/login' exact component={Login} />
    <Route path='/' exact component={Home} />
    </BrowserRouter>
  );
}

export default App;
