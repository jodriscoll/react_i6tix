import {
  ORDER_COMPLETE,
} from '../constants/actionTypes';

const initialState = {
  order: {
    confirmation: "",
    items: [],
    shareUrl: [],
  },
};

export default function orderReducer( state = initialState.order, action) {
  switch (action.type) {

    case ORDER_COMPLETE:
      return {
        ...state,
        confirmation: action.orderDetails.orderID,
        items: action.items,
        shareUrl: action.orderDetails.orderData.thumbnails.length ? action.orderDetails.orderData.thumbnails : ['https://www.lovemyposter.com/'],
      };

    default:
      return state;
  }
}
