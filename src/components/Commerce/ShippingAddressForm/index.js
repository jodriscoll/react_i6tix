import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../actions/cartActions';
import strings from '../../../constants/strings.js';
import { Container, Row, FormGroup, Label, Input } from 'reactstrap';
import AddressFields from '../AddressFields';
import FormErrorMessage from '../FormErrorMessage';
import config from '../../../../storefront/config';

class ShippingAddressForm extends Component {

    componentWillMount() {
        // If we don't have a delivery method set, set it to the first option.
        if (this.props.orderInformation.shipping.deliveryMethod.methodID === 0) {
          this.props.actions.updateShippingMethod(this.shippingOptions.filter(item => item.methodID === "1").pop());
        }
    }

    handleAddressChange = (element) => {
        const val = element.target.value;
        const field = element.target.dataset.field;
        this.props.actions.updateShippingAddress(field, val);
    };

    shippingOptions = config.shippingOptions;

    handleShippingMethodSelection = (item) => {
        const val = item.target.value;
        this.props.actions.updateShippingMethod(this.shippingOptions.filter(item => item.methodID === val).pop());
    };

    render() {

        const shippingAddress = this.props.orderInformation.shipping.address;
        const renderedShippingOptions = this.shippingOptions.map(item => (<option key={item.methodID} value={item.methodID}>{item.methodName}</option>));

        return (
            <div className="checkout__step-1">
                <Container>
                    <Row>
                        <FormErrorMessage show={this.props.hasError} message={strings.shippingError} />
                    </Row>
                    <Row className="checkout__form">
                        <AddressFields
                            handleAddressChange={this.handleAddressChange}
                            address={shippingAddress} />
                        <FormGroup>
                            <Label for="delivery-method">Delivery Method</Label>
                            <Input type="select"
                                   name="delivery-method"
                                   id="delivery-method"
                                   autoComplete="delivery-method"
                                   value={this.props.orderInformation.shipping.deliveryMethod.methodID}
                                   onChange={this.handleShippingMethodSelection}
                            >
                              {renderedShippingOptions}
                            </Input>
                            <span className="invalid-input" />
                        </FormGroup>
                    </Row>
                    <Row>
                        <FormGroup>
                            <Label for="delivery-phone-number">Phone Number</Label>
                            <Input type="tel"
                                   name="delivery-phone-number"
                                   id="delivery-phone-number"
                                   data-field="phone"
                                   autoComplete="tel-national"
                                   onChange={this.handleAddressChange}
                                   value={shippingAddress.phone}
                                   required={true}
                                   title="Please enter only numbers"
                                   pattern="^[0-9]*$"/>
                            <span className="invalid-input" />
                        </FormGroup>
                    </Row>
                    <Row>
                        <FormGroup>
                            <Label for="delivery-email">Email Address</Label>
                            <Input type="email"
                                   name="delivery-email"
                                   id="delivery-email"
                                   data-field="email"
                                   autoComplete="email"
                                   onChange={this.handleAddressChange}
                                   value={shippingAddress.email}
                                   required={true} />
                            <span className="invalid-input" />
                        </FormGroup>
                    </Row>
                </Container>
            </div>
        );
    }
}

ShippingAddressForm.propTypes = {
    actions: PropTypes.object,
    cart: PropTypes.object,
    orderInformation: PropTypes.object,
    hasError: PropTypes.bool,
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
    mapDispatchToProps
)(ShippingAddressForm);
