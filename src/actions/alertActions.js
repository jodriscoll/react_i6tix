import {
    SHOW_ALERT,
    DISMISS_ALERT,
} from '../constants/actionTypes';

export const showAlert = (message, alertType) => ({
    type: SHOW_ALERT,
    message,
    alertType
});

export const dismissAlert = () => ({
    type: DISMISS_ALERT,
});
