import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const submitContactData = orderDatas => {
  return {
    type: actionTypes.SUBMIT_CONTACT_DATA,
    orders: orderDatas
  };
};

export const submitContactDataFail = error => {
  return {
    type: actionTypes.SUBMIT_CONTANT_DATA_FAIL,
    error: error
  };
};

export const submitContactDataStart = () => {
  return {
    type: actionTypes.SUBMIT_CONTACT_DATA_START
  };
};

export const asyncSubmitContactData = orderDatas => {
  return dispatch => {
    dispatch(submitContactDataStart());
    axios
      .post("/orders.json", orderDatas)
      .then(response => {
        dispatch(submitContactData(orderDatas));
      })
      .catch(error => {
        dispatch(submitContactDataFail());
      });
  };
};
