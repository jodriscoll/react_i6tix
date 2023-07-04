import {
  UPDATE_SHIPPING_ADDRESS,
  UPDATE_BILLING_INFORMATION,
  UPDATE_SHIPPING_METHOD,
  ORDER_COMPLETE,
} from '../constants/actionTypes';

const initialState = {
    cartInformation: {
        shipping: {
            address: {
                fullName: "",
                addressLineOne: "",
                addressLineTwo: "",
                city: "",
                state: "AL",
                zip: "",
                country: "US",
                phone: "",
                email: "",
            },
            deliveryMethod: {
                methodID: 0,
                methodName: "",
                methodCost: 0
            },
        },
        billing: {
            cardNumber: "",
            cardExpiration: "",
            cardSecurityCode: "",
            sameAddressAsShipping: true,
            addressLineOne: "",
            addressLineTwo: "",
            city: "",
            state: "AL",
            zip: "",
            country: "US",
        },
    },
};

export default function orderInformation( state = initialState.cartInformation, action) {
    
    switch (action.type) {
        case UPDATE_SHIPPING_ADDRESS:
            return ({
                ...state,
                shipping: {
                    ...state.shipping,
                    address: {
                        ...state.shipping.address,
                        [action.field]: action.val,
                    }
                }
            });

        case UPDATE_BILLING_INFORMATION:
            return ({
                ...state,
                billing: {
                    ...state.billing,
                    [action.field]: action.val,
                }
            });

        case UPDATE_SHIPPING_METHOD:
            return ({
                ...state,
                shipping: {
                    ...state.shipping,
                    deliveryMethod: action.val,
                }
            });

        case ORDER_COMPLETE:
            return ({ ...initialState.cartInformation });

        default:
            return state;
    }
}
