import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Backdrop, Button, Input, Fade, Modal } from '@material-ui/core';

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
  const [name, setName] = React.useState('');
  const [id, setId] = React.useState('');
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
  const handleId = event => {
    setId(event.target.value);
  };
  const handlePrice = event => {
    setPrice(event.target.value);
  };
  const handleQuantity = event => {
    setQuantiy(event.target.value);
  };

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Add Item
      </button>
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
              <Button type="submit">Add</Button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
