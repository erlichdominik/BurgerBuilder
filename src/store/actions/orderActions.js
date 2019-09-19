import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const mountOrders = orders => {
  return {
    type: actionTypes.ASYNC_MOUNT_ORDERS,
    orders: orders
  };
};

export const mountOrdersFail = () => {
  return {
    type: actionTypes.MOUNT_ORDERS_FAIL
  };
};

export const asyncMountOrders = () => {
  return dispatch => {
    axios
      .get("/orders.json")
      .then(response => {
        const fetchedOrders = [];
        for (let key in response.data) {
          fetchedOrders.push(response.data[key]);
        }
        dispatch(mountOrders(fetchedOrders));
      })
      .catch(error => {
        dispatch(mountOrdersFail());
      });
  };
};
