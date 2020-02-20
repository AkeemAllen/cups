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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleName = event => {
    setName(event.target.value);
  };

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        react-transition-group
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
              <Input placeholder="ID" style={{ marginRight: '5px' }} />
              <br />
              <Input
                placeholder="Name"
                style={{ marginRight: '5px' }}
                value={name}
                onChange={handleName}
              />
              <br />
              <Input placeholder="Price" style={{ marginRight: '5px' }} />
              <br />
              <Input placeholder="Quantity" style={{ marginRight: '5px' }} />
              <br />
              <Button type="submit">Add</Button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
