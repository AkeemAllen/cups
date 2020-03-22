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

function RecipeReviewCard(props) {
  const classes = useStyles();

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
        <IconButton aria-label="Add To Cart">
          <Button
            variant="outlined"
            onClick={() => props.addToCart(props.productId)}
          >
            Add To Cart
          </Button>
        </IconButton>
      </CardActions>
    </Card>
  );
}

RecipeReviewCard.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.number,
  productId: PropTypes.number,
  addToCart: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  cart: state.orders.cart
});

const mapDispatchToProps = dispatch => ({
  addToCart: bindActionCreators(addToCart, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeReviewCard);
