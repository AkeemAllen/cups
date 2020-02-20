import React from 'react';
import TransitionsModal from '../components/modal';

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%'
  }
};

const Dashboard = () => {
  return (
    <div>
      <h1 style={styles.header}>Dashboard</h1>
      <TransitionsModal />
    </div>
  );
};

export default Dashboard;
