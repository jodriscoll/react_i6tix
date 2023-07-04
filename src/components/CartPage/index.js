import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Row, Col, Card, CardBody, CardFooter, CardTitle } from 'reactstrap';
import { push } from 'react-router-redux';
import { FormattedMessage } from 'react-intl';
import strings from '../../constants/strings.js';
import * as actions from '../../actions/cartActions';
import * as posterActions from '../../actions/posterActions';
import * as utilityActions from '../../actions/utilityActions';
import CartItem from '../Commerce/CartItem';
import Logo from '../Common/Logo';
import PosterSelectionLink from '../Common/PosterSelectionLink';
import OrderSummary from '../Commerce/OrderSummary';
import config from '../../../storefront/config';
import { STEP_CUSTOMIZE_TEMPLATE } from '../../constants/posterPersonalization';
import { STEP_SHIPPING_ADDRESS } from '../../constants/checkoutSteps';
import ReactGA from 'react-ga';

class CartPage extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false
        };
    }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    removeFromCart = (id) => {
        this.props.actions.removeFromCart(id);
    };

    editCartItem = (item) => {
        this.props.actions.editCartItem(item);
    };

    handleAddMore = () => {
        this.props.posterActions.setStep(STEP_CUSTOMIZE_TEMPLATE);
        this.props.posterActions.selectPoster(0);
        this.props.posterActions.selectTemplate(0);
        this.props.dispatch(push('/'));
    };

    componentWillMount() {
        this.props.actions.setStep(STEP_SHIPPING_ADDRESS);
        window.scrollTo(0, 0);
    }

    render() {
        const cartItems = this.props.cart.map((item) => (<CartItem key={item.id} item={item} />));
        const { logoCheckout } = config;

        return (
            <section className="poster-view-cart">
                <Container>
                    <Row>
                        <Logo size="default" source={logoCheckout} />
                    </Row>
                    <Row>
                        <Col
                            xs="12"
                            md="12"
                            lg="8"
                            className="checkout__card">
                            <Card>
                                <CardTitle className="checkout__title">
                                    <span>Your Cart</span>
                                </CardTitle>
                                <CardBody>
                                    {cartItems.length
                                        ? cartItems
                                        : <span className="checkout__empty-text">
                                            <h2>
                                                <FormattedMessage {...strings.cartEmpty} />
                                            </h2>
                                            <p><FormattedMessage {...strings.cartGetStarted} /></p>
                                        </span>
                                    }
                                </CardBody>
                                <CardFooter>
                                    <PosterSelectionLink className="btn btn-brand" gaEvent={() => {
                                        ReactGA.event({
                                            category: 'Cart',
                                            action: 'Clicked create another button'
                                        });
                                    }}>
                                        {cartItems.length
                                            ? <FormattedMessage {...strings.cartAddMore} />
                                            : <FormattedMessage {...strings.cartCreatePoster} />
                                        }
                                    </PosterSelectionLink>
                                </CardFooter>
                            </Card>
                        </Col>
                        <Col
                            xs="12"
                            md="12"
                            lg="4"
                            className="order-summary">
                            <Card>
                                <CardBody>
                                    <span className="order-summary__title">
                                        <FormattedMessage {...strings.orderSummary} />
                                    </span>
                                    <OrderSummary shouldDisplayPolicies={true} />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        );
    }

}

CartPage.propTypes = {
    actions: PropTypes.object,
    cart: PropTypes.array,
    posterActions: PropTypes.object,
    utilityActions: PropTypes.object,
    utilities: PropTypes.object,
    dispatch: PropTypes.func,
};


function mapStateToProps(state) {
    return {
        cart: state.cart.items,
        utilities: state.utilities,
    };
}

function mapDispatchToProps(dispatch) {
    const dispatchActions = {
        actions: bindActionCreators(actions, dispatch),
        posterActions: bindActionCreators(posterActions, dispatch),
        utilityActions: bindActionCreators(utilityActions, dispatch),
    };
    return { ...dispatchActions, dispatch }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CartPage);
