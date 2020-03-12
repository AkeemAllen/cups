import React from 'react';
import ProductCard from '../components/productCard';
import Container from '@material-ui/core/Container';
import NavBar from '../components/navBar';

function UserMenu() {
  return (
    <div>
      <NavBar />
      <Container maxWidth="lg" className="main">
        <h1 className="header" align="center">
          Our Menu
        </h1>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <ProductCard
            title="Coffee"
            price="$1000"
            image={require('../assets/images/coffee.jpg')}
          />
          <ProductCard
            title="Sugar Bun"
            price="$150"
            image={require('../assets/images/sugarbun.jpg')}
          />
        </div>
      </Container>
    </div>
  );
}
export default UserMenu;
