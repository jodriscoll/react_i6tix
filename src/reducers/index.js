import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import alertReducer from './alertReducer';
import posterPersonalizationReducer from './posterPersonalizationReducer';
import cartReducer from './cartReducer';
import facebookReducer from './facebookReducer';
import instagramReducer from './instagramReducer';
import utilityReducer from './utilityReducer';
import orderReducer from './orderReducer';
import orderInformationReducer from './orderInformationReducer';

const rootReducer = combineReducers({
    routing: routerReducer,
    alert: alertReducer,
    poster: posterPersonalizationReducer,
    order: orderReducer,
    cart: cartReducer,
    orderInformation: orderInformationReducer,
    facebook: facebookReducer,
    instagram: instagramReducer,
    utilities: utilityReducer,
});

export default rootReducer;
