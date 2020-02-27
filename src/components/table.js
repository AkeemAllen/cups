import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import { fetchProducts } from '../redux/actions/productActions';
import PropTypes from 'prop-types';

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
  componentDidMount() {
    this.props.fetchProducts();
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
  products: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  products: state.products.products
});

export default connect(mapStateToProps, { fetchProducts })(CustomizedTables);
