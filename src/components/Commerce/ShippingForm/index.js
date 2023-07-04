import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Row, Col, Card, CardBody, CardFooter, CardTitle } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import strings from '../../../constants/strings.js';
import * as actions from '../../../actions/cartActions';
import Logo from '../../Common/Logo';
import SetStepButton from '../../Poster/SetStepButton';
import OrderSummary from '../../Commerce/OrderSummary';
import ShippingAddressForm from '../ShippingAddressForm';
import { STEP_PAYMENT_METHOD } from '../../../constants/checkoutSteps';
import { validate } from '../../../utils/formValidator';
import config from '../../../../storefront/config';
import ReactGA from 'react-ga';

class ShippingForm extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        };
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    gaEvent() {
        ReactGA.event({
            category: 'Checkout',
            action: 'Continue',
            label: 'Shipping Form'
        });
      }


    handleFormSubmit() {
        let valid = validate(this.formEl);

        this.setState({
            hasError: !valid
        });

        if(valid) {
            this.props.actions.setCheckoutLoading(true);
            // allow animation to play at least once
            setTimeout(() => {
                this.props.actions.validateShippingAddress(this.props.orderInformation.shipping.address).then(() => {
                    this.props.actions.setCheckoutLoading(false);
                });
            }, 1000);
        }
        else {
            const firstError = document.getElementsByClassName('first-error');
            if (firstError.length) {
                firstError[0].focus();
            }
        }
    }

    render() {
        const { logoCheckout } = config;

        return (
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
                                <span>Shipping</span>
                                <span>1 of 3</span>
                            </CardTitle>
                            <CardBody>
                                <form ref={form => (this.formEl = form)}>
                                    <ShippingAddressForm hasError={this.state.hasError} />
                                </form>
                            </CardBody>
                            <CardFooter>
                                <SetStepButton
                                    onClick={() => {
                                        this.gaEvent();
                                        this.handleFormSubmit();
                                    }}
                                    color="brand"
                                    className="btn--change-step"
                                    step={STEP_PAYMENT_METHOD}
                                    text={<FormattedMessage {...strings.continueButton} />}
                                />
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
                                <OrderSummary shouldDisplayCheckoutButton={false} shouldDisplayTermsAndConditions={false} />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

ShippingForm.propTypes = {
    actions: PropTypes.object,
    cart: PropTypes.object,
    orderInformation: PropTypes.object,
    handleSetStep: PropTypes.func,
};


function mapStateToProps(state) {
    return {
        cart: state.cart,
        orderInformation: state.orderInformation,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ShippingForm);
