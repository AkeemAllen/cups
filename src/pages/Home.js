import React from 'react';
// import coffeeShop from '../assets/images/coffee-shop.jpg';
import './stylesheets/home.scss';
// import { Card, CardMedia, CardContent, Typography } from '@material-ui/core';

function Home() {
  return (
    <div className="main">
      <div className="top-container">
        <h1 className="header">Cups Uplifting People</h1>
        <h2 className="sub-header">One Stop Coffee Shop</h2>
      </div>
      <div className="content">
        <h1 className="title">Who We Are</h1>
        <p className="paragraph">
          Cups is a friendly coffee service that is dedicated to serving every
          customer that walks through our doors.{' '}
        </p>
      </div>
    </div>
  );
}
export default Home;
