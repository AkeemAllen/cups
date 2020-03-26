import React from 'react';
import './stylesheets/home.scss';
import coffee from '../assets/images/coffee.png';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import NavBar from '../components/navBar';

function Home() {
  return (
    <div className="main">
      <NavBar />
      <div className="header">
        <div className="header-content">
          <div className="header-text">
            <h1>Coffee Uplifting People&apos;s Spirits</h1>
            <p>
              Made with the love of all people in mind. Enjoy the refreshing
              taste of fellowship.
            </p>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <Button
                variant="contained"
                disableElevation
                className="login-btn"
                // onClick={handleOpen}
              >
                LOGIN
              </Button>
            </Link>
          </div>
          <div>
            <img src={coffee} className="vector-img" alt="coffee-vector" />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;
