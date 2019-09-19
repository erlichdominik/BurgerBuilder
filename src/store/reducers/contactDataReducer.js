import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initalState = {
  loading: false,
  orders: []
};

const submitingContactData = (state, action) => {
  return updateObject(state, {
    orders: state.orders.concat(action.orderDatas),
    loading: false
  });
};

const submitingContactDataFail = (state, action) => {
  return updateObject(state, {
    loading: false
  });
};

const submitingContactDataStart = (state, action) => {
  return updateObject(state, {
    loading: true
  });
};

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case actionTypes.SUBMIT_CONTACT_DATA:
      return submitingContactData(state, action);

    case actionTypes.SUBMIT_CONTANT_DATA_FAIL:
      return submitingContactDataFail(state, action);

    case actionTypes.SUBMIT_CONTACT_DATA_START:
      return submitingContactDataStart(state, action);

    default:
      return state;
  }
};

export default reducer;
