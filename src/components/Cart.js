import React from 'react';
import {
  IconButton,
  Drawer,
  List,
  ListItem,
  Button,
  Modal,
  Backdrop
} from '@material-ui/core';
import { ShoppingCart, Delete, AttachMoney } from '@material-ui/icons';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeFromCart, placeOrder } from '../redux/actions/orderActions';
import { bindActionCreators } from 'redux';

function Cart(props) {
  const [open, setOpen] = React.useState(false);
  const [openModal, setModal] = React.useState(false);
  const [message, setMessage] = React.useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleModalOpen = message => {
    setModal(open);
    setMessage(message);
  };

  const handleCloseModal = () => {
    setModal(false);
  };

  const handleOrder = () => {
    props.placeOrder(
      props.user,
      props.cart,
      props.totalCost,
      props.accountBalance
    );
    handleModalOpen('Order Successful');
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
        {props.user !== undefined ? (
          <h3
            style={{
              fontFamily: 'Courgette, san-serif',
              marginRight: 'auto',
              marginLeft: 'auto',
              marginBottom: '5px'
            }}
          >
            {props.user.userName}
          </h3>
        ) : null}
        {props.user !== undefined ? (
          <h4
            style={{
              fontFamily: 'Courgette, san-serif',
              marginTop: '0px',
              marginLeft: '10px'
            }}
          >
            Balance: ${props.accountBalance}
          </h4>
        ) : null}
        {props.canAfford !== true ? (
          <h5
            style={{
              fontFamily: 'Courgette, san-serif',
              color: 'red'
            }}
          >
            Account Balance too low
          </h5>
        ) : null}
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
          disabled={props.cart.length <= 0 || props.canAfford === false}
          onClick={() => {
            handleOrder();
          }}
        >
          Place Order
        </Button>
        <Modal
          style={styles.modal}
          open={openModal}
          onClose={handleCloseModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500
          }}
        >
          <div style={styles.modalMessage}>
            <h1>{message}</h1>
          </div>
        </Modal>
      </Drawer>
    </div>
  );
}

Cart.propTypes = {
  placeOrder: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  cart: PropTypes.array,
  user: PropTypes.object,
  canAfford: PropTypes.bool,
  accountBalance: PropTypes.number,
  totalCost: PropTypes.number
};

const mapStateToProps = state => ({
  cart: state.orders.cart,
  user: state.auth.user,
  canAfford: state.orders.canAfford,
  accountBalance: state.orders.accountBalance,
  totalCost: state.orders.totalCost
});

const mapDispatchToProps = dispatch => ({
  removeFromCart: bindActionCreators(removeFromCart, dispatch),
  placeOrder: bindActionCreators(placeOrder, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

const styles = {
  modalMessage: {
    display: 'flex',
    flexDirection: 'column',
    padding: '30px',
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0px 0px 9px 0px rgba(0,0,0,0.7)'
  },
  modal: {
    justifyContent: 'center',
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    height: '100vh'
  }
};
