import React from 'react';

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%'
  }
};

class Home extends React.Component {
  render() {
    return (
      <div>
        <h1 style={styles.header}>Home</h1>
      </div>
    );
  }
}
export default Home;
