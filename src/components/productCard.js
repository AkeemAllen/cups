import React from 'react';
import {
  Card,
  makeStyles,
  Button,
  Input,
  Typography,
  IconButton,
  Avatar,
  CardActions,
  CardContent,
  CardMedia,
  CardHeader
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import PropTypes from 'prop-types';
import { addToCart } from '../redux/actions/orderActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
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
  }
}));

function ProductCard(props) {
  const classes = useStyles();

  const validateUser = item => {
    if (localStorage.user !== undefined) {
      props.addToCart(item);
    } else {
      alert('Please Log In');
    }
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="AVI" className={classes.avatar}>
            P
          </Avatar>
        }
        title={props.title}
      />
      <CardMedia className={classes.media} image={props.image} title="Coffee" />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.price}
        </Typography>
      </CardContent>
      <CardActions style={{ justifyContent: 'space-between' }} disableSpacing>
        <IconButton aria-label="Product Amount">
          <Input type="number" style={{ width: '75px' }} placeholder="Amount" />
        </IconButton>
        <Button variant="outlined" onClick={() => validateUser(props.item)}>
          Add To Cart
        </Button>
      </CardActions>
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
