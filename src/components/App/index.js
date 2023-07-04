/* eslint-disable import/no-named-as-default */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import NotFoundPage from '../NotFoundPage';
import StartPage from '../HomePage';
import CartPage from '../CartPage';
import CheckoutFlow from '../Commerce/CheckoutFlow';
import ReactGA from 'react-ga';
import TagManager from 'react-gtm-module';
import config from '../../../storefront/config';

class App extends Component {

    componentDidMount() {
        ReactGA.initialize(config.googleAnalyticsId);
        TagManager.initialize({
          gtmId: config.googleTagManagerId
        });
    }

    render() {
        return (
            <main className="app-wrapper">
                <Switch>
                    <Route exact path="/poster" component={StartPage} />
                    <Route exact path="/cart" component={CartPage} />
                    <Route exact path="/checkout" component={CheckoutFlow} />
                    <Route component={NotFoundPage} />
                </Switch>
            </main>
        );
    }
}

App.propTypes = {
    children: PropTypes.element
};

export default hot(module)(App);
