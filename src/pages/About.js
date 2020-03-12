import React from 'react';
import NavBar from '../components/navBar';

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%'
  }
};

const About = () => {
  return (
    <div>
      <NavBar />
      <h1 style={styles.header}>About</h1>
    </div>
  );
};

export default About;
