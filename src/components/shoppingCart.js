import React, { Component } from 'react';
import { IconButton } from '@material-ui/core';
import Shopping from '@material-ui/icons/ShoppingCart';

export default class ShoppingCart extends Component {
  render() {
    return (
      <IconButton className="icon-container" onClick={this.handleOpen}>
        <Shopping className="shopping-icon" />
        {/* <div>{this.props.cart.length}</div> */}
      </IconButton>
    );
  }
}
