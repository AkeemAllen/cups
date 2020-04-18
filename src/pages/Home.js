import React from 'react';
import './stylesheets/home.scss';
// import coffee from '../assets/images/coffee.png';
import { Grid } from '@material-ui/core';
// import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={styles.base}>
      <Grid container style={styles.container} justify="space-between">
        <Grid item style={styles.headerText}>
          <h1>Cups Uplifting People</h1>
          <p>
            Made with the love of all people in mind. Enjoy the refreshing taste
            of fellowship
          </p>
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
    backgroundColor: '#316e8f',
    // padding: '0px 400px',
    height: '400px'
  },
  headerText: {
    color: 'white',
    margin: 'auto 10px'
  },
  content: {
    width: '60%',
    margin: 'auto'
  }
};

export default Home;
