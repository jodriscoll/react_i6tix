/* eslint-disable import/default */

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import configureStore, { history } from './store/configureStore';
import Root from './components/Root';
import './styles/styles.scss';
require('./favicon.ico');

const { store, persistor } = configureStore();

render(
    <AppContainer>
        <Root store={store} history={history} persistor={persistor} />
    </AppContainer>,
    document.getElementById('app')
);

if (module.hot) {
    module.hot.accept('./components/Root/index.js', () => {
        const NewRoot = require('./components/Root/index.js').default;

        render(
            <AppContainer>
                <NewRoot store={store} history={history} persistor={persistor} />
            </AppContainer>,
            document.getElementById('app')
        );
    });
}
