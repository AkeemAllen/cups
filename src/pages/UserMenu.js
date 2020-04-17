import React from 'react';
import ProductCard from '../components/ProductCard';
import {
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button
} from '@material-ui/core';
import NavBar from '../components/NavBar';
import { fetchProducts } from '../redux/actions/productActions';
import { removeFromCart, placeOrder } from '../redux/actions/orderActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ShoppingCart, Inbox, Mail, Delete } from '@material-ui/icons';
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
    const itemNumber = cart.length;

    const productItems = products.map(product => (
      <ProductCard
        key={product._id}
        item={product}
        title={product.productName}
        price={product.price}
        image={require('../assets/images/coffee-shop.jpg')}
      />
    ));

    return (
      <div>
        <div className="main-container">
          <NavBar />
          <h1 align="center">Our Menu</h1>
          <IconButton className="icon-container" onClick={this.handleOpen}>
            <ShoppingCart className="shopping-icon" />
            <div>{itemNumber}</div>
          </IconButton>
        </div>
        <Container maxWidth="lg" className="content">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {productItems}
          </div>
        </Container>
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
