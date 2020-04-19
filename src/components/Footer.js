import React from 'react';
import { Grid } from '@material-ui/core';

function Footer() {
  return (
    <Grid container justify="center" style={styles.container} spacing={0}>
      <Grid item>
        <h4>@Cups Incorporated</h4>
      </Grid>
    </Grid>
  );
}

const styles = {
  container: {
    backgroundColor: '#fafafa',
    color: 'black',
    position: 'absolute',
    bottom: 0
  }
};

export default Footer;
