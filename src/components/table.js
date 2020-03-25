import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  IconButton,
  Button
} from '@material-ui/core';
import { connect } from 'react-redux';
import { fetchProducts, deleteProduct } from '../redux/actions/productActions';
import PropTypes from 'prop-types';
import Delete from '@material-ui/icons/Delete';
import Create from '@material-ui/icons/Create';
import ImageForm from './ImageForm';
// import axios from 'axios';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow);

const styles = {
  table: {
    minWidth: 700
  }
};

class CustomizedTables extends React.Component {
  state = {
    open: false,
    id: null
  };

  componentDidMount() {
    this.props.fetchProducts();
  }

  handleOpen = productId => {
    this.setState({ open: true, id: productId });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    let imageViewUri;
    process.env.NODE_ENV !== 'production'
      ? (imageViewUri = 'http://localhost:5000/image')
      : (imageViewUri = `${process.env.REACT_APP_MONGO_API_BASE_URI}/image`);
    const productItems = this.props.products.map(product => (
      <StyledTableRow key={product._id}>
        <StyledTableCell component="th" scope="row">
          {product.productName}
        </StyledTableCell>
        <StyledTableCell align="center">{product.quantity}</StyledTableCell>
        <StyledTableCell align="center">{product.category}</StyledTableCell>
        <StyledTableCell align="center">{product.price}</StyledTableCell>
        <StyledTableCell align="center">
          {product.image !== null ? (
            <a href={`${imageViewUri}/${product.image}`}>View Image</a>
          ) : (
            <Button
              size="small"
              onClick={() => this.handleOpen(product._id)}
              style={{ margin: 0 }}
            >
              Upload Image
            </Button>
          )}
        </StyledTableCell>
        <StyledTableCell align="center">
          {' '}
          <IconButton onClick={() => this.props.deleteProduct(product._id)}>
            <Delete />
          </IconButton>{' '}
          <IconButton>
            <Create />
          </IconButton>
        </StyledTableCell>
      </StyledTableRow>
    ));
    return (
      <TableContainer component={Paper}>
        <Table style={styles.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Product Name</StyledTableCell>
              <StyledTableCell align="center">Stock</StyledTableCell>
              <StyledTableCell align="center">Category</StyledTableCell>
              <StyledTableCell align="center">Price</StyledTableCell>
              <StyledTableCell align="center">Image</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>{productItems}</TableBody>
          <ImageForm
            id={this.state.id}
            open={this.state.open}
            handleClose={() => this.handleClose()}
          />
        </Table>
      </TableContainer>
    );
  }
}

CustomizedTables.propTypes = {
  fetchProducts: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
  product: PropTypes.object
};

const mapStateToProps = state => ({
  products: state.products.products,
  product: state.products.product
});

export default connect(mapStateToProps, { fetchProducts, deleteProduct })(
  CustomizedTables
);
