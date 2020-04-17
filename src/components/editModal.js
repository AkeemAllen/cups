import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Backdrop, Button, Input, Fade, Modal } from '@material-ui/core';
import { updateProduct } from '../redux/actions/productActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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

function EditModal(props) {
  const classes = useStyles();
  const [category, setCategory] = React.useState('');
  const [name, setName] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [quantity, setQuantiy] = React.useState('');

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
    props.updateProduct(props.id, { name, price, quantity, category });
    props.handleCloseEdit();
  };
  return (
    <div>
      <Modal
        className={classes.modal}
        open={props.open}
        onClose={props.handleCloseEdit}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={props.open}>
          <form className={classes.form}>
            <h1 className={classes.header}>Edit Menu Item</h1>
            <Input
              placeholder="Name"
              className={classes.input}
              value={name}
              onChange={handleName}
              disableUnderline={true}
            />
            <Input
              placeholder="Category"
              className={classes.input}
              value={category}
              onChange={handleCategory}
              disableUnderline={true}
            />
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
            <Button
              type="submit"
              onClick={handleSubmit}
              className={classes.submitBtn}
            >
              Edit
            </Button>
          </form>
        </Fade>
      </Modal>
    </div>
  );
}

EditModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleCloseEdit: PropTypes.func.isRequired,
  updateProduct: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
};

export default connect(null, { updateProduct })(EditModal);
