import React from 'react';
import ProductCard from '../components/productCard';
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
import NavBar from '../components/navBar';
import { fetchProducts } from '../redux/actions/productActions';
import { removeFromCart, placeOrder } from '../redux/actions/orderActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ShoppingCart, Inbox, Mail, Delete } from '@material-ui/icons';
import './stylesheets/userMenu.scss';

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
    const itemNumber = this.props.cart.length;
    const productItems = this.props.products.map(product => (
      <ProductCard
        key={product._id}
        item={product}
        title={product.productName}
        price={product.price}
        image={require('../assets/images/coffee.jpg')}
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
          open={this.state.open}
          onClose={this.handleClose}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <List style={{ width: '250px' }}>
            {this.props.cart.map(product => (
              <ListItem button key={product._id}>
                <ListItemIcon>
                  {product % 2 === 0 ? <Inbox /> : <Mail />}
                </ListItemIcon>
                <ListItemText primary={product.productName} />
                <IconButton
                  onClick={() => this.props.removeFromCart(product._id)}
                >
                  <Delete />
                </IconButton>
              </ListItem>
            ))}
          </List>
          <Button
            style={{ width: '75%', display: 'flex', justifyContent: 'center' }}
            onClick={() =>
              this.props.placeOrder(this.props.user, this.props.cart)
            }
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
  user: PropTypes.object
};

const mapStateToProps = state => ({
  products: state.products.products,
  cart: state.orders.cart,
  user: state.auth.user
});

export default connect(mapStateToProps, {
  fetchProducts,
  removeFromCart,
  placeOrder
})(UserMenu);
