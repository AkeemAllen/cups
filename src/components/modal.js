import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Backdrop, Button, Input, Fade, Modal } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

export default function TransitionsModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState(0);
  const [category, setCategory] = React.useState('');
  const [name, setName] = React.useState('');
  const [price, setPrice] = React.useState(0.0);
  const [quantity, setQuantiy] = React.useState(0);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleId = event => {
    setId(event.target.value);
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
    let uri;
    process.env.NODE_ENV !== 'production'
      ? (uri = 'http://localhost:5000/products')
      : (uri = `${process.env.REACT_APP_MONGO_API_BASE_URI}/products`);

    axios
      .post(uri, {
        id: id,
        productName: name,
        category: category,
        quantity: quantity,
        price: price
      })
      .then(response => {
        console.log(response);
        response.status === 200 ? alert('success') : alert('failed');
      })
      .catch(err => {
        throw err;
      });
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
          marginTop: '20px'
        }}
      >
        <AddCircle style={{ marginRight: '10px' }} /> Add Item
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
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
          <div className={classes.paper}>
            <form>
              <h1>Add Menu Item</h1>
              <Input
                placeholder="ID"
                style={{ marginRight: '5px' }}
                value={id}
                onChange={handleId}
              />
              <br />
              <Input
                placeholder="Name"
                style={{ marginRight: '5px' }}
                value={name}
                onChange={handleName}
              />
              <br />
              <Input
                placeholder="Category"
                style={{ marginRight: '5px' }}
                value={category}
                onChange={handleCategory}
              />
              <br />
              <Input
                placeholder="Quantiy"
                style={{ marginRight: '5px' }}
                value={quantity}
                onChange={handleQuantity}
              />
              <br />
              <Input
                placeholder="Price"
                style={{ marginRight: '5px' }}
                value={price}
                onChange={handlePrice}
              />
              <br />
              <Button type="submit" onClick={handleSubmit}>
                Add
              </Button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
