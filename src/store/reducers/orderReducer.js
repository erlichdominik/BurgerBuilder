import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initalState = {
  error: false,
  orders: []
};

const mountOrdersFailed = (state, action) => {
  return updateObject(state, {
    error: true
  });
};

const asyncMountingOrders = (state, action) => {
  return updateObject(state, {
    orders: action.orders,
    error: false
  });
};

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case actionTypes.MOUNT_ORDERS_FAIL:
      return mountOrdersFailed(state, action);

    case actionTypes.ASYNC_MOUNT_ORDERS:
      return asyncMountingOrders(state, action);

    default:
      return state;
  }
};

export default reducer;
