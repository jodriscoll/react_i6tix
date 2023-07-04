import {
  SET_CART_STEP,
  ORDER_COMPLETE,
} from '../constants/actionTypes';
import OrderApi from '../api/OrderApi';
import {STEP_COMPLETE} from "../constants/checkoutSteps";
import {showAlert} from "./alertActions";

export const setStep = (step) => ({
  type: SET_CART_STEP,
  step,
});

export const orderComplete = (orderDetails, items) => ({
  type: ORDER_COMPLETE,
  orderDetails,
  items,
  step: STEP_COMPLETE,
});

export const placeOrder = (cart) => {
  return dispatch => {
    return OrderApi.placeOrder(cart).then((data) => {
      dispatch(orderComplete(data, cart.items));
    }).catch((err) => {
      dispatch(showAlert(err, "danger"));
    })
  }
};
