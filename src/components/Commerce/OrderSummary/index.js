import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from "../../../actions/cartActions";
import { Button } from 'reactstrap';
import { push } from 'react-router-redux';
import strings from '../../../constants/strings.js';
import { FormattedMessage } from 'react-intl';
import Currency from 'react-currency-formatter';
import TermsConditionsModal from '../../Modals/TermsConditions';
import PoliciesModal from '../../Modals/Policies';
import PosterSelectionLink from '../../Common/PosterSelectionLink';
import ReactGA from 'react-ga';
import config from '../../../../storefront/config';

class OrderSummary extends Component {

    gaEvent(category, action) {
        ReactGA.event({
            category: category,
            action: action
        });
    }

    render() {

        const {
            shouldDisplayCheckoutButton = true,
            shouldDisplayTermsAndConditions = true,
            shouldDisplayPolicies = false,
            shouldDisplayPlaceOrder = false,
            cart,
            orderInformation,
        } = this.props;

        let subtotalPrice = 0;

        cart.items.map((item) => {
            subtotalPrice += item.posterData.templates[item.templateId].price * item.quantity;
        });

        const shippingPrice = orderInformation.shipping.deliveryMethod.methodCost;
        const taxPrice = 0;
        const totalPrice = subtotalPrice + shippingPrice + taxPrice;

        const selectedFreeShipping = shippingPrice === 0 && orderInformation.shipping.deliveryMethod.methodName.length > 0;

        const alwaysFreeShipping = config.shippingOptions.length && (
            config.shippingOptions
                .map(option => option.methodCost)
                .reduce(
                    (allPreviousAreFree, cost) => (allPreviousAreFree && cost == 0),
                    true)
        );

        const handleCheckoutClick = () => {
            this.props.dispatch(
                push('/checkout')
            );
        };

        return (
            <section className="cost">
                <div className="cost__row subtotal">
                    <FormattedMessage {...strings.subtotalHeading} />
                    <span><Currency quantity={subtotalPrice} /></span>
                </div>
                <div className="cost__row shipping">
                    <FormattedMessage {...strings.shippingHeading} />
                    {shippingPrice !== 0 && <span><Currency quantity={shippingPrice} /></span>}
                    {shippingPrice === 0 && (
                        (selectedFreeShipping || alwaysFreeShipping) && <span>FREE!</span> || <span>--</span>
                    )}
                </div>
                {taxPrice !== 0 &&
                    <div className="cost__row tax">
                        <FormattedMessage {...strings.taxHeading} />
                        <span><Currency quantity={taxPrice} /></span>
                    </div>
                }
                <div className="cost__row total">
                    <FormattedMessage {...strings.totalHeading} />
                    <span><Currency quantity={totalPrice} /></span>
                </div>

                {shouldDisplayCheckoutButton &&
                    <div className="checkout">
                        <PosterSelectionLink className="btn btn-brand">
                            {cart.items.length
                                ? <FormattedMessage {...strings.cartAddMore} />
                                : <FormattedMessage {...strings.cartCreatePoster} />
                            }
                        </PosterSelectionLink>
                        <Button className="btn btn-brand"
                            disabled={cart.items.length < 1}
                            onClick={() => {
                                this.gaEvent('Cart', 'Clicked begin checkout button');
                                handleCheckoutClick();
                            }}>
                            <FormattedMessage {...strings.checkoutButton} />
                        </Button>
                    </div>
                }

                {shouldDisplayTermsAndConditions &&
                    <div className="terms-and-conditions">
                        <TermsConditionsModal
                            className="modal__terms-conditions"
                            iframeSrc={config.termsConditionsUrl}
                        />
                    </div>
                }

                {shouldDisplayPolicies &&
                    <div>
                        <div className="policies">
                            <p className="title">Policies</p>
                            <p className="policies__links">
                                <PoliciesModal
                                    className="modal__refund-policies"
                                    name="Refunds"
                                    iframeSrc={config.refundPolicyUrl}
                                />
                                <span> | </span>
                                <PoliciesModal
                                    className="modal__shipping-policies"
                                    name="Shipping"
                                    iframeSrc={config.shippingPolicyUrl}
                                />
                                <span> | </span>
                                <PoliciesModal
                                    className="modal__privacy-policies"
                                    name="Privacy"
                                    iframeSrc={config.privacyPolicyUrl}
                                />
                            </p>
                        </div>
                        <div className="policies contact">
                            <p>
                                <PoliciesModal
                                    className="modal__contact"
                                    name="Contact Us"
                                    iframeSrc={config.contactUsUrl}
                                />
                            </p>
                        </div>
                    </div>
                }

                {shouldDisplayPlaceOrder &&
                    <div className="checkout">
                        <Button
                            color="brand"
                            className="btn--change-step"
                            onClick={() => {
                                this.gaEvent('Checkout', 'Placed order');
                                this.props.handlePlaceOrder();
                            }}
                        >
                            <FormattedMessage {...strings.submitButton} />
                        </Button>
                    </div>
                }
            </section>
        );
    }
}

OrderSummary.propTypes = {
    actions: PropTypes.object,
    handleSetStep: PropTypes.func,
    cart: PropTypes.object,
    orderInformation: PropTypes.object,
    shouldDisplayCheckoutButton: PropTypes.bool,
    shouldDisplayTermsAndConditions: PropTypes.bool,
    shouldDisplayPolicies: PropTypes.bool,
    shouldDisplayPlaceOrder: PropTypes.bool,
    dispatch: PropTypes.func,
    handlePlaceOrder: PropTypes.func,
};

function mapStateToProps(state) {
    return {
        cart: state.cart,
        orderInformation: state.orderInformation,
    };
}

function mapDispatchToProps(dispatch) {
    const dispatchActions = {
        actions: bindActionCreators(actions, dispatch),
    };
    return { ...dispatchActions, dispatch };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderSummary);
