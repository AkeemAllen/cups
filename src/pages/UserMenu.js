import React from 'react';
import ProductCard from '../components/ProductCard';
import { Grid, Button } from '@material-ui/core';
import { fetchProducts } from '../redux/actions/productActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class UserMenu extends React.Component {
  state = {
    category: 'coffee'
  };

  componentDidMount() {
    this.props.fetchProducts();
  }

  changeMenuItems = newCategory => {
    this.setState({ category: newCategory });
  };

  render() {
    const { products } = this.props;

    const productItems = products.map(product => (
      <Grid item key={product._id}>
        <ProductCard
          item={product}
          title={product.productName}
          price={product.price}
          image={require('../assets/images/coffee-shop.jpg')}
        />
      </Grid>
    ));

    const snacks = products
      .filter(product => product.category === 'Snack')
      .map(product => (
        <Grid item key={product._id}>
          <ProductCard
            item={product}
            title={product.productName}
            price={product.price}
            image={require('../assets/images/coffee-shop.jpg')}
          />
        </Grid>
      ));
    const coffee = products
      .filter(product => product.category === 'Coffee')
      .map(product => (
        <Grid item key={product._id}>
          <ProductCard
            item={product}
            title={product.productName}
            price={product.price}
            image={require('../assets/images/coffee-shop.jpg')}
          />
        </Grid>
      ));
    const beverages = products
      .filter(product => product.category === 'Beverage')
      .map(product => (
        <Grid item key={product._id}>
          <ProductCard
            item={product}
            title={product.productName}
            price={product.price}
            image={require('../assets/images/coffee-shop.jpg')}
          />
        </Grid>
      ));
    const specials = products
      .filter(product => product.category === 'Special')
      .map(product => (
        <Grid item key={product._id}>
          <ProductCard
            item={product}
            title={product.productName}
            price={product.price}
            image={require('../assets/images/coffee-shop.jpg')}
          />
        </Grid>
      ));

    return (
      <div style={{ padding: 16 }}>
        <Grid container spacing={4} justify="center">
          <Grid container justify="center">
            <Grid item>
              <Button onClick={() => this.changeMenuItems('all')}>
                <h3 style={styles.choices}>All</h3>
              </Button>
            </Grid>
            <Grid item>
              <Button onClick={() => this.changeMenuItems('coffee')}>
                <h3 style={styles.choices}>Coffee</h3>
              </Button>
            </Grid>
            <Grid item>
              <Button onClick={() => this.changeMenuItems('beverages')}>
                <h3 style={styles.choices}>Beverages</h3>
              </Button>
            </Grid>
            <Grid item>
              <Button onClick={() => this.changeMenuItems('snacks')}>
                <h3 style={styles.choices}>Snacks</h3>
              </Button>
            </Grid>
            <Grid item>
              <Button onClick={() => this.changeMenuItems('specials')}>
                <h3 style={styles.choices}>Specials</h3>
              </Button>
            </Grid>
          </Grid>
          {this.state.category === 'specials' ? specials : null}
          {this.state.category === 'all' ? productItems : null}
          {this.state.category === 'coffee' ? coffee : null}
          {this.state.category === 'beverages' ? beverages : null}
          {this.state.category === 'snacks' ? snacks : null}
        </Grid>
      </div>
    );
  }
}

UserMenu.propTypes = {
  products: PropTypes.array.isRequired,
  fetchProducts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  products: state.products.products,
  cart: state.orders.cart,
  user: state.auth.user
});

const mapDispatchToProps = dispatch => ({
  fetchProducts: bindActionCreators(fetchProducts, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);

const styles = {
  choices: {
    fontFamily: 'Courgette, sans-serif'
  }
};
