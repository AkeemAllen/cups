import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';

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

function createData(name, stock, category, price) {
  return { name, stock, category, price };
}

const rows = [createData('sf', 34, 'sdf', 34)];

const useStyles = makeStyles({
  table: {
    minWidth: 700
  }
});

const getProducts = () => {
  let uri;
  process.env.NODE_ENV !== 'production'
    ? (uri = 'http://localhost:5000/products')
    : (uri = `${process.env.REACT_APP_MONGO_API_BASE_URI}/products`);

  axios.get(uri).then(response => {
    response.data.forEach(element => {
      console.log(element.productName);
      rows.push(
        createData(
          element.productName,
          element.quantity,
          element.category,
          element.price
        )
      );
    });
    console.log(rows);
  });
};

export default function CustomizedTables() {
  const classes = useStyles();
  getProducts();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Product Name</StyledTableCell>
            <StyledTableCell align="Center">Stock</StyledTableCell>
            <StyledTableCell align="Center">Category</StyledTableCell>
            <StyledTableCell align="Center">Price</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="Center">{row.stock}</StyledTableCell>
              <StyledTableCell align="Center">{row.category}</StyledTableCell>
              <StyledTableCell align="Center">{row.price}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
