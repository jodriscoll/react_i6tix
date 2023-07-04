import shortid from 'shortid';
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  EDIT_CART_ITEM,
  SET_CART_STEP,
  UPDATE_CART,
  ORDER_COMPLETE,
  SET_CHECKOUT_LOADING,
  SHOW_ALERT,
} from '../constants/actionTypes';

const initialState = {
    cart: {
        step: 1,
        items: [],
        loading: false,
    },
};

export default function cartReducer( state = initialState.cart, action) {
    
    switch (action.type) {
        case ADD_TO_CART:
            return ({
                ...state,
                items: [
                    ...state.items,
                    {  ...action.item, id: shortid.generate(), quantity: 1 },
                ]
            });

        case REMOVE_FROM_CART:
            return ({
                ...state,
                items: [
                    ...state.items.filter(item => action.id !== item.id)
                ]
            });

        case EDIT_CART_ITEM:
            return ({
                ...state,
                items: state.items.map((item) => {
                    if(item.id == action.item.id) {
                        return {...item, ...action.item};
                    }
                    return item;
                })
            });

        case UPDATE_CART:
            return ({
                ...state,
                items: [
                    ...state.items.filter(item => action.item.id !== item.id),
                    action.item
                ]
            });

        case SET_CHECKOUT_LOADING:
            return({
                ...state,
                loading: action.loading
            });

        case SET_CART_STEP:
            return ({ ...state, step: action.step });

        case ORDER_COMPLETE:
            return ({ ...initialState.cart, step: action.step });

        case SHOW_ALERT:
            return ({ ...state, loading: false });

        default:
            return state;
    }
}
