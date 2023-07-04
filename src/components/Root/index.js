import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { PersistGate } from 'redux-persist/integration/react';
import Beforeunload from 'react-beforeunload';
import App from '../App';

export default class Root extends Component {
    constructor(props) {
        super(props);

        const userAgent = ((navigator || {}).userAgent || "").toLowerCase();
        const deviceIsAndroid = userAgent.indexOf("android") > -1;

        this.state = {
            screenIsLandscape: false,
            deviceIsPortrait: false,
            deviceIsAndroid
        };
        this.handleResizeAndRotation = this.handleResizeAndRotation.bind(this);
    }

    componentDidMount() {
        this.handleResizeAndRotation();
        window.addEventListener("resize", this.handleResizeAndRotation);
        window.addEventListener("orientationchange", this.handleResizeAndRotation);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleResizeAndRotation);
        window.removeEventListener("orientationchange", this.handleResizeAndRotation);
      }

    handleResizeAndRotation() {
        const orientation = screen.msOrientation || (screen.orientation || screen.mozOrientation || {}).type;

        const screenIsLandscape = (
            orientation === "landscape-primary"
            || orientation === "landscape-secondary"
            || (
                orientation === undefined
                && window.orientation
                && (
                    window.orientation === 90
                    || window.orientation === -90
                )
            )
        );

        const deviceIsPortrait = (screen.width < screen.height );

        this.setState({
            screenIsLandscape,
            deviceIsPortrait
        });
    }

    renderBody() {
        const { store, history, persistor } = this.props;

        return (
            <IntlProvider locale="en">
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <Beforeunload onBeforeunload={() => persistor.flush()}>
                            <ConnectedRouter history={history}>
                                <App />
                            </ConnectedRouter>
                        </Beforeunload>
                    </PersistGate>
                </Provider>
            </IntlProvider>
        );
    }

    renderRotationMessage() {
        return (
            <section className="rotate-device">
                <Container>
                    <Row>
                        <Col xs="12">
                            <div className="rotate-device__content">
                                <h1>Please rotate your device.</h1>
                                <p>The MyPoster experience is best using portrait mode. Please rotate your device.</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        );
    }

    render() {
        /* Note: On iOS, we can know if the device is natively portrait, but on Android we can't */
        if (this.state.screenIsLandscape && (this.state.deviceIsPortrait || this.state.deviceIsAndroid)) {
            return this.renderRotationMessage();
        } else {
            return this.renderBody();
        }
    }
}

Root.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    persistor: PropTypes.object.isRequired,
};
