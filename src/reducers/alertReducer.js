import {
    SHOW_ALERT,
    DISMISS_ALERT,
    SET_CART_STEP,
    SET_STEP,
} from '../constants/actionTypes';

const initialState = {
    alert: {
        message: '',
        type: '',
    },
};

export default function alertReducer( state = initialState.alert, action) {

    switch (action.type) {
        case SHOW_ALERT:
            return ({ ...state, message: action.message, type: action.alertType });

        case DISMISS_ALERT:
            return ({ ...state, message: '', type: '' });

        case SET_CART_STEP:
        case SET_STEP:
            return ({ ...state, message: '', type: '' });

        default:
            return state;
    }
}

