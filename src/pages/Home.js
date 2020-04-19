import React from 'react';
import './stylesheets/home.scss';
// import coffee from '../assets/images/coffee.png';
import { Grid } from '@material-ui/core';
// import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={styles.base}>
      <Grid
        container
        style={{
          backgroundImage: `linear-gradient(rgba(250, 250, 250,0.5), rgba(250, 250, 250,0.5)),url(${require('../assets/images/coffee-background_3.jpg')})`,
          backgroundSize: 'cover',
          height: '400px'
        }}
        justify="center"
      >
        <Grid item style={styles.headerText}>
          <img
            src={require('../assets/images/coffeeLogo1.png')}
            alt="cups logo"
            width="300px"
          />
        </Grid>
        {/* <Grid item alignContent="center">
          <img src={require('../assets/images/coffee.png')} width="200px" />
        </Grid> */}
      </Grid>
      <Grid
        container
        direction="column"
        alignItems="center"
        style={styles.content}
      >
        <Grid item>
          <h2>A Little Love In Every Cup</h2>
        </Grid>
        <Grid item>
          <p>
            Cups Uplifting People (CUP’s) is a local coffee shop that provides a
            relaxing getaway in the middle of the city for the disabled
            community. We here at CUP’s are dedicated to holding firm to our
            name, which is to provide quality service to not only to the sighted
            among us but also the visually impaired and otherwise physically
            challenged.
          </p>
        </Grid>
      </Grid>
    </div>
  );
}

const styles = {
  base: {
    fontFamily: 'Montserrat, sans-serif'
  },
  container: {
    backgroundImage:
      'url(`require("../assets/images/coffee-background_3.jpg")`)',
    // padding: '0px 400px',
    height: '400px'
  },
  headerText: {
    color: 'black'
  },
  content: {
    width: '60%',
    margin: 'auto'
  }
};

export default Home;
