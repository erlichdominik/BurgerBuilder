import React, { Component } from "react";
import Order from "../../components/Order/Order";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/indexActions";

class Orders extends Component {
  state = {
    loading: true
  };

  componentDidMount() {
    this.props.onOrdersMounted();
  }

  render() {
    return (
      <div>
        {this.props.orders.map((el, id) => {
          return (
            <Order key={id} ingredients={el.ingredient} price={el.price} />
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.ord.orders
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrdersMounted: () => dispatch(actionCreators.asyncMountOrders())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Orders);
