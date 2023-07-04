import {createStore, compose, applyMiddleware} from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import {routerMiddleware} from 'react-router-redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'localforage'
import rootReducer from '../reducers';
import config from '../../storefront/config';
export const history = createHistory({basename: config.directory});

const persistConfig = {
    key: config.directory || "root",
    storage,
    whitelist: ['cart']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

function configureStoreProd(initialState) {
    const reactRouterMiddleware = routerMiddleware(history);
    const middlewares = [
        thunk,
        reactRouterMiddleware,
    ];

    return createStore(persistedReducer, initialState, compose(
        applyMiddleware(...middlewares)
        )
    );
}

function configureStoreDev(initialState) {
    const reactRouterMiddleware = routerMiddleware(history);
    const middlewares = [
        reduxImmutableStateInvariant(),

        // thunk middleware can also accept an extra argument to be passed to each thunk action
        // https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
        thunk,
        reactRouterMiddleware,
    ];

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools
    const store = createStore(persistedReducer, initialState, composeEnhancers(
        applyMiddleware(...middlewares)
        )
    );

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextReducer = require('../reducers').default; // eslint-disable-line global-require
            store.replaceReducer(
                persistReducer(persistConfig, nextReducer)
            );
        });
    }

    return store;
}

export default () => {
    const configureStore = process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev;
    let store = configureStore();
    let persistor = persistStore(store);
    return { store, persistor }
}
