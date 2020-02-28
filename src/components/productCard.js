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
import {Button, Input} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 250,
    maxHeight:250,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function RecipeReviewCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        title="Product Name"
      />
     {/* <CardMedia
        className={classes.media}
        image="/static/images/cards/paella.jpg"
        title="Coffee"
        maxHeight="100px"
        maxWidth="100px"
     /> */}
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          Meal Description
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <Input type='number' style={{ width:"75px" }}/>
        </IconButton>
        <IconButton aria-label="Add To Cart">
          <Button>Add To Cart</Button>
        </IconButton>
      </CardActions>
    </Card>
  );
}
