import React from 'react';
import ProductCard from '../components/ProductCard';
import { Grid } from '@material-ui/core';
import { fetchProducts } from '../redux/actions/productActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class UserMenu extends React.Component {
  componentDidMount() {
    this.props.fetchProducts();
  }

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

    return (
      <div style={{ padding: 16 }}>
        <Grid container spacing={4} justify="center">
          {productItems}
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
