import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import { Button, Input } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 340
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

export default function RecipeReviewCard(props) {
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
          <Button variant="outlined">Add To Cart</Button>
        </IconButton>
      </CardActions>
    </Card>
  );
}

RecipeReviewCard.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.number
};
