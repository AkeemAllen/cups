import React from 'react';
import {
  Card,
  makeStyles,
  Button,
  Input,
  Typography,
  CardActions,
  CardContent,
  CardMedia,
  Modal,
  Backdrop
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import PropTypes from 'prop-types';
import { addToCart } from '../redux/actions/orderActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
  modal: {
    justifyContent: 'center',
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    height: '100vh'
  },
  root: {
    maxWidth: 340,
    boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.5)'
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: red[500]
  },
  modalMessage: {
    display: 'flex',
    flexDirection: 'column',
    padding: '30px',
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0px 0px 9px 0px rgba(0,0,0,0.7)'
  }
}));

function ProductCard(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  // const [amount, setAmount] = React.useState(0);

  const validateUser = item => {
    if (localStorage.user !== undefined) {
      props.addToCart(item);
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={props.image}
        title={props.title}
      />
      <CardContent title={props.title}>
        <h4
          style={{
            margin: '0',
            marginBottom: '5px',
            fontFamily: 'Courgette, sans-serif'
          }}
        >
          {props.title}
        </h4>
        <Typography variant="body2" color="textSecondary" component="p">
          ${props.price}
        </Typography>
      </CardContent>
      <CardActions style={{ justifyContent: 'space-between' }}>
        <Input type="number" style={{ width: '75px' }} placeholder="Amount" />
        <Button variant="depressed" onClick={() => validateUser(props.item)}>
          Add To Cart
        </Button>
      </CardActions>
      {/**
       * Asks user Logged In if Logged Out
       */}
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
        <div className={classes.modalMessage}>Please Log In</div>
      </Modal>
    </Card>
  );
}

ProductCard.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.number,
  item: PropTypes.object,
  addToCart: PropTypes.func.isRequired,
  user: PropTypes.object
};

const mapStateToProps = state => ({
  cart: state.orders.cart,
  user: state.auth.user
});

const mapDispatchToProps = dispatch => ({
  addToCart: bindActionCreators(addToCart, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
