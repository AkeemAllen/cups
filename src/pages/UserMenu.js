import React from 'react';
import ProductCard from '../components/ProductCard';
import {
  Grid,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button
} from '@material-ui/core';
// import NavBar from '../components/NavBar';
import { fetchProducts } from '../redux/actions/productActions';
import { removeFromCart, placeOrder } from '../redux/actions/orderActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Inbox, Mail, Delete } from '@material-ui/icons';
import './stylesheets/userMenu.scss';
import { bindActionCreators } from 'redux';

class UserMenu extends React.Component {
  state = {
    open: false
  };

  componentDidMount() {
    this.props.fetchProducts();
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const {
      cart,
      products,
      user,
      removeFromCart,
      placeOrder,
      open
    } = this.props;
    // const itemNumber = cart.length;

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
      <div>
        <Grid container spacing={4} justify="center">
          {productItems}
        </Grid>
        <Drawer
          anchor="right"
          open={open}
          onClose={this.handleClose}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <List style={{ width: '250px' }}>
            {cart.map(product => (
              <ListItem button key={product._id}>
                <ListItemIcon>
                  {product % 2 === 0 ? <Inbox /> : <Mail />}
                </ListItemIcon>
                <ListItemText primary={product.productName} />
                <IconButton onClick={() => removeFromCart(product._id)}>
                  <Delete />
                </IconButton>
              </ListItem>
            ))}
          </List>
          <Button
            style={{ width: '75%', display: 'flex', justifyContent: 'center' }}
            onClick={() => placeOrder(user, cart)}
          >
            Place Order
          </Button>
        </Drawer>
      </div>
    );
  }
}

UserMenu.propTypes = {
  fetchProducts: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  placeOrder: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
  cart: PropTypes.array,
  user: PropTypes.object,
  open: PropTypes.bool
};

const mapStateToProps = state => ({
  products: state.products.products,
  cart: state.orders.cart,
  user: state.auth.user
});

const mapDispatchToProps = dispatch => ({
  fetchProducts: bindActionCreators(fetchProducts, dispatch),
  removeFromCart: bindActionCreators(removeFromCart, dispatch),
  placeOrder: bindActionCreators(placeOrder, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
