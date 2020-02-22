import React from 'react';
import { withStyles } from '@material-ui/core/styles';
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

// function createData(name, stock, category, price) {
//   return { name, stock, category, price };
// }

const styles = {
  table: {
    minWidth: 700
  }
};

export default class CustomizedTables extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      records: []
    };
  }

  componentDidMount() {
    this.getProducts();
  }

  componentDidUpdate() {}

  getProducts = () => {
    let uri;
    process.env.NODE_ENV !== 'production'
      ? (uri = 'http://localhost:5000/products')
      : (uri = `${process.env.REACT_APP_MONGO_API_BASE_URI}/products`);

    axios.get(uri).then(response => {
      response.data.forEach(element => {
        this.setState({
          records: [
            ...this.state.records,
            {
              productName: element.productName,
              category: element.category,
              quantity: element.quantity,
              price: element.price
            }
          ]
        });
      });
    });
  };

  render() {
    return (
      <TableContainer component={Paper}>
        <Table style={styles.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Product Name</StyledTableCell>
              <StyledTableCell align="Center">Stock</StyledTableCell>
              <StyledTableCell align="Center">Category</StyledTableCell>
              <StyledTableCell align="Center">Price</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.records.map(record => (
              <StyledTableRow key={record.name}>
                <StyledTableCell component="th" scope="row">
                  {record.productName}
                </StyledTableCell>
                <StyledTableCell align="Center">
                  {record.quantity}
                </StyledTableCell>
                <StyledTableCell align="Center">
                  {record.category}
                </StyledTableCell>
                <StyledTableCell align="Center">{record.price}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}
