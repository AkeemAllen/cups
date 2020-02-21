import React from 'react';
import coffeeShop from '../assets/images/coffee-shop.jpg';
import './stylesheets/home.scss';
import { Card, CardMedia, CardContent, Typography } from '@material-ui/core';

function Home() {
  return (
    <div className="main">
      <div className="top-container">
        <h1 className="header">CUPS</h1>
        <h2 className="sub-header">One Stop Coffee Shop</h2>
      </div>
      <div className="content">
        <Card className="card">
          <CardMedia className="card-media" image={coffeeShop} />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              This impressive paella is a perfect party dish and a fun meal to
              cook together with your guests. Add 1 cup of frozen peas along
              with the mussels, if you like.
            </Typography>
          </CardContent>
        </Card>
        <Card className="card">
          <CardMedia className="card-media" image={coffeeShop} />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              This impressive paella is a perfect party dish and a fun meal to
              cook together with your guests. Add 1 cup of frozen peas along
              with the mussels, if you like.
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
export default Home;
