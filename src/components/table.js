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
  IconButton
} from '@material-ui/core';
import { connect } from 'react-redux';
import { fetchProducts, deleteProduct } from '../redux/actions/productActions';
import PropTypes from 'prop-types';
import Delete from '@material-ui/icons/Delete';
import Create from '@material-ui/icons/Create';
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
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    this.props.fetchProducts();
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.product) {
      this.props.products.push(nextProps.product);
    }
  }

  render() {
    const productItems = this.props.products.map(product => (
      <StyledTableRow key={product._id}>
        <StyledTableCell component="th" scope="row">
          {product.productName}
        </StyledTableCell>
        <StyledTableCell align="center">{product.quantity}</StyledTableCell>
        <StyledTableCell align="center">{product.category}</StyledTableCell>
        <StyledTableCell align="center">{product.price}</StyledTableCell>
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
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>{productItems}</TableBody>
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
