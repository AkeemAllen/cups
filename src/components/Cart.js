import React from 'react';
import {
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button
} from '@material-ui/core';
import { ShoppingCart, Mail, Inbox, Delete } from '@material-ui/icons';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeFromCart, placeOrder } from '../redux/actions/orderActions';

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
      <IconButton style={{ color: 'white' }} onClick={handleOpen}>
        <ShoppingCart />
        <div>{itemNumber}</div>
      </IconButton>
      <Drawer
        anchor="right"
        open={open}
        onClose={handleClose}
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <List style={{ width: '250px' }}>
          {props.cart.map(product => (
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
          style={{
            width: '75%',
            display: 'flex',
            justifyContent: 'center'
          }}
          onClick={() => placeOrder(props.user, props.cart)}
        >
          Place Order
        </Button>
      </Drawer>
    </div>
  );
}

Cart.propTypes = {
  cart: PropTypes.array,
  user: PropTypes.object
};

const mapStateToProps = state => ({
  cart: state.orders.cart,
  user: state.auth.user
});

export default connect(mapStateToProps, {})(Cart);
