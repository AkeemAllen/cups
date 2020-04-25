import React from 'react';
import { fetchOrders } from '../redux/actions/orderActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Analytics extends React.Component {
  componentDidMount() {
    this.props.fetchOrders();
  }

  render() {
    let totalRevenue = 0;
    this.props.orders.forEach(order => {
      totalRevenue = totalRevenue + order.cost;
    });
    return (
      <div>
        <h1>Analytics</h1>
        <h3>Total Revenue: ${totalRevenue}</h3>
      </div>
    );
  }
}

Analytics.propTypes = {
  fetchOrders: PropTypes.func.isRequired,
  orders: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  orders: state.orders.orders
});
export default connect(mapStateToProps, { fetchOrders })(Analytics);
