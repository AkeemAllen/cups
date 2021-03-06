import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Backdrop,
  Button,
  Input,
  Fade,
  Modal,
  Select
} from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
// import axios from 'axios';
import { newProduct } from '../redux/actions/productActions.js';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

const useStyles = makeStyles(theme => ({
  modal: {
    justifyContent: 'center',
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    height: '100vh'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    padding: '100px',
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0px 0px 9px 0px rgba(0,0,0,0.7)'
  },
  input: {
    display: 'flex',
    marginBottom: '20px',
    alignItems: 'center',
    borderRadius: '20px',
    backgroundColor: '#ccc5b9',
    paddingRight: '15px',
    paddingLeft: '15px'
  },
  header: {
    display: 'flex',
    justifyContent: 'center'
  },
  submitBtn: {
    marginTop: '20px',
    backgroundImage: 'linear-gradient(45deg, #8e2de2, #4a00e0)',
    color: 'white',
    borderRadius: '25px'
  }
}));

function TransitionsModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [category, setCategory] = React.useState('');
  const [name, setName] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [quantity, setQuantiy] = React.useState('');

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleName = event => {
    setName(event.target.value);
  };
  const handleCategory = event => {
    setCategory(event.target.value);
  };
  const handlePrice = event => {
    setPrice(event.target.value);
  };
  const handleQuantity = event => {
    setQuantiy(event.target.value);
  };
  const handleSubmit = event => {
    event.preventDefault();
    props.newProduct(name, price, quantity, category);
    handleClose();
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '20px'
        }}
      >
        <AddCircle style={{ marginRight: '10px' }} /> Add Item
      </Button>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <form className={classes.form} onSubmit={handleSubmit}>
            <h1 className={classes.header}>Add Menu Item</h1>
            <Input
              placeholder="Name"
              className={classes.input}
              value={name}
              onChange={handleName}
              disableUnderline={true}
            />
            <Select
              className={classes.input}
              native
              value={category}
              onChange={handleCategory}
              disableUnderline
            >
              <option value="Beverage">Beverage</option>
              <option value="Snack">Snack</option>
              <option value="Special">Special</option>
              <option value="Coffee">Coffee</option>
            </Select>
            <Input
              placeholder="Quantiy"
              className={classes.input}
              value={quantity}
              onChange={handleQuantity}
              disableUnderline={true}
            />
            <Input
              placeholder="Price"
              className={classes.input}
              value={price}
              onChange={handlePrice}
              disableUnderline={true}
            />
            <Button type="submit" className={classes.submitBtn}>
              Add
            </Button>
          </form>
        </Fade>
      </Modal>
    </div>
  );
}

TransitionsModal.propTypes = {
  newProduct: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth.isAdmin
});

const mapDispatchToProps = dispatch => ({
  newProduct: bindActionCreators(newProduct, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(TransitionsModal);
