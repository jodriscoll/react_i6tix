import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Row, Col, Card, CardBody, CardTitle, CardFooter, Button } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import strings from '../../../constants/strings.js';
import * as actions from '../../../actions/cartActions';
import * as orderActions from '../../../actions/orderActions';
import config from '../../../../storefront/config';
import Logo from '../../Common/Logo';
import OrderSummary from '../../Commerce/OrderSummary';
import PaymentReview from '../PaymentReview';
import ShippingReview from '../ShippingReview';
import CartItemReview from '../CartItemReview';

class OrderReview extends PureComponent {

  handlePlaceOrder = () => {
    this.props.actions.setCheckoutLoading(true);
    // allow animation to play at least once
    setTimeout(() => {
        this.props.orderActions.placeOrder({ ...this.props.cart, ...this.props.orderInformation });
    }, 1000);
  };


  render() {
        const { handleSetStep, cart, orderInformation } = this.props;
        const { logoCheckout } = config;
        const cartItems = cart.items.map((item) => (<CartItemReview key={item.id} item={item} />));

        return (
            <Container className="checkout__step-3">
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
                                <span>Review & Submit</span>
                                <span>3 of 3</span>
                            </CardTitle>
                            <CardBody>
                                <Container className="checkout__review-posters">
                                    <Row>
                                        <Col xs="12">{cartItems}</Col>
                                    </Row>
                                </Container>
                                <div className="checkout__review-shipping">
                                    <ShippingReview handleSetStep={handleSetStep}
                                                    address={orderInformation.shipping.address}
                                                    delivery={orderInformation.shipping.deliveryMethod} />
                                </div>
                                <div className="checkout__review-payment">
                                    <PaymentReview handleSetStep={handleSetStep}
                                                   cardNumber={orderInformation.billing.cardNumber}
                                                   billing={orderInformation.billing} />
                                </div>
                            </CardBody>
                            <CardFooter>
                                <Button
                                    color="brand"
                                    onClick={this.handlePlaceOrder} >
                                    <FormattedMessage {...strings.submitButton} />
                                </Button>
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
                                <OrderSummary
                                    shouldDisplayCheckoutButton={false}
                                    shouldDisplayTermsAndConditions={false}
                                    shouldDisplayPlaceOrder={true}
                                    handleSetStep={handleSetStep}
                                    handlePlaceOrder={this.handlePlaceOrder} />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }

}

OrderReview.propTypes = {
    actions: PropTypes.object,
    cart: PropTypes.object,
    orderInformation: PropTypes.object,
    handleSetStep: PropTypes.func,
    orderActions: PropTypes.object,
};

function mapStateToProps(state) {
    return {
        cart: state.cart,
        orderInformation: state.orderInformation,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch),
        orderActions: bindActionCreators(orderActions, dispatch),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(OrderReview);
