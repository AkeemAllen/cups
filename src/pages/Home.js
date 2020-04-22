import React from 'react';
// import coffee from '../assets/images/coffee.png';
import {
  Grid,
  Button,
  Card,
  CardMedia,
  CardContent,
  Typography
} from '@material-ui/core';
import { Link } from 'react-router-dom';

const styles = {
  base: {
    fontFamily: 'Courgette, sans-serif'
  },
  container: {
    backgroundImage:
      'url(`require("../assets/images/coffee-background_3.jpg")`)',
    height: '400px'
  },
  headerText: {
    color: 'black'
  },
  content: {
    width: '60%',
    margin: 'auto',
    paddingTop: '100px',
    paddingBottom: '100px'
  },
  contentItem: {
    display: 'flex',
    flexDirection: 'column',
    width: '350px',
    alignItems: 'center'
  },
  callToAction: {
    height: '400px'
  },
  card: {
    maxWidth: 340,
    boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.5)',
    marginBottom: '30px'
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  }
};
const items = [
  {
    attribute: 'Diversity',
    image: require('../assets/images/coffee.png'),
    description: 'Many Flavors, Many People, One Cup',
    alt: 'diversity'
  },
  {
    attribute: 'Compassion',
    image: require('../assets/images/coffee.png'),
    description: 'Just Like Mom Used To Make.',
    alt: 'compassion'
  },
  {
    attribute: 'Love',
    image: require('../assets/images/coffee.png'),
    description: "Is It In The Atmosphere? No, It's Just Our Coffee.",
    alt: 'love'
  }
];

const mappedItems = items.map(item => (
  <Grid item style={styles.contentItem} key={item.attribute}>
    <h1>{item.attribute}</h1>
    <p>{item.description}</p>
  </Grid>
));

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
      </Grid>
      <Grid
        container
        direction="row"
        alignItems="center"
        justify="center"
        style={styles.content}
        spacing={9}
      >
        {mappedItems}
      </Grid>
      <Grid
        container
        direction="column"
        // justify="center"
        alignItems="center"
        style={styles.callToAction}
      >
        <Grid item>
          <h1>Today&apos;s Special</h1>
        </Grid>
        <Grid item>
          <Card style={styles.card}>
            <CardMedia
              style={styles.media}
              image={require('../assets/images/sugarbun.jpg')}
              title="Coffee"
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                Marmalade dipped in Svelete Sauce
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item>
          <Link to="/menu" style={{ textDecoration: 'none' }}>
            <Button
              style={{
                backgroundColor: '#e35b2d',
                color: 'white',
                fontFamily: 'Courgette'
              }}
            >
              See What else is on the Menu
            </Button>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
