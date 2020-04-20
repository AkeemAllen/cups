import React from 'react';
import { IconButton, Drawer, List, ListItem, Button } from '@material-ui/core';
import { ShoppingCart, Delete, AttachMoney } from '@material-ui/icons';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeFromCart, placeOrder } from '../redux/actions/orderActions';
import { bindActionCreators } from 'redux';

function Cart(props) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const itemNumber = props.cart.length;
  return (
    <div>
      <IconButton style={{ color: '#e35b2d' }} onClick={handleOpen}>
        <ShoppingCart />
        <div>{itemNumber}</div>
      </IconButton>
      <Drawer
        anchor="right"
        open={open}
        onClose={handleClose}
        style={{
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <List style={{ width: '250px' }}>
          {props.cart.map(product => (
            <ListItem
              button
              key={product.product._id}
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}
            >
              <h3 style={{ fontFamily: 'Courgette, sans-serif' }}>
                {product.quantity} {product.product.productName}
              </h3>
              <div>
                ${product.cost}
                <IconButton
                  onClick={() => props.removeFromCart(product.product._id)}
                >
                  <Delete />
                </IconButton>
              </div>
            </ListItem>
          ))}
          <ListItem
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <h3
              style={{
                fontFamily: 'Courgette, sans-serif',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <AttachMoney />
              Total Cost
            </h3>
            ${props.totalCost}
          </ListItem>
        </List>
        <Button
          style={{
            width: '75%',
            display: 'flex',
            backgroundColor: '#316e8f',
            margin: '10px auto',
            color: 'white'
          }}
          disabled={props.cart.length <= 0}
          onClick={() => props.placeOrder(props.user, props.cart)}
        >
          Place Order
        </Button>
      </Drawer>
    </div>
  );
}

Cart.propTypes = {
  placeOrder: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  cart: PropTypes.array,
  user: PropTypes.object,
  totalCost: PropTypes.number
};

const mapStateToProps = state => ({
  cart: state.orders.cart,
  user: state.auth.user,
  totalCost: state.orders.totalCost
});

const mapDispatchToProps = dispatch => ({
  removeFromCart: bindActionCreators(removeFromCart, dispatch),
  placeOrder: bindActionCreators(placeOrder, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
