import {
  REMOVE_FROM_CART,
  EDIT_CART_ITEM,
  SET_CART_STEP,
  UPDATE_SHIPPING_ADDRESS,
  UPDATE_BILLING_INFORMATION,
  UPDATE_SHIPPING_METHOD,
  SET_CHECKOUT_LOADING
} from '../constants/actionTypes';
import ValidateShippingApi from '../api/ValidateShippingApi';
import {STEP_PAYMENT_METHOD} from "../constants/checkoutSteps";
import {showAlert} from "./alertActions";

export const removeFromCart = (id) => ({
    type: REMOVE_FROM_CART,
    id,
});

export const editCartItem = (item) => ({
    type: EDIT_CART_ITEM,
    item,
});

export const setStep = (step) => ({
    type: SET_CART_STEP,
    step,
});

export const updateShippingAddress = (field, val) => ({
    type: UPDATE_SHIPPING_ADDRESS,
    field,
    val,
});

export const updateBillingInformation = (field, val) => ({
    type: UPDATE_BILLING_INFORMATION,
    field,
    val,
});

export const updateShippingMethod = (val) => ({
    type: UPDATE_SHIPPING_METHOD,
    val,
});

export const validateShippingAddress = (address) => {
  return dispatch => {
    return ValidateShippingApi.validateAddress(address).then(() => {
      dispatch(setStep(STEP_PAYMENT_METHOD));
    }).catch(err => {
      dispatch(showAlert(err, "danger"));
    });
  }
}

export const setCheckoutLoading = (loading) => ({
    type: SET_CHECKOUT_LOADING,
    loading
});