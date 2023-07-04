import {
    UTILITY_QUANTITY_DROPDOWN_TOGGLE
} from '../constants/actionTypes';

const initialState = {
    utilities: {
        quantityDropdown: false,
    }
};

export default function utilityReducer( state = initialState.utilities, action) {
    switch (action.type) {

        case UTILITY_QUANTITY_DROPDOWN_TOGGLE:
            return ({ ...state, quantityDropdown: !state.quantityDropdown });

        default:
            return state;
    }
}
