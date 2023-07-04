import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Row, Col, FormGroup, Label, Input, Card, CardTitle, CardBody, CardFooter } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import CreditCardInput from 'react-credit-card-input';
import strings from '../../../constants/strings.js';
import * as actions from '../../../actions/cartActions';
import Logo from "../../Common/Logo";
import SetStepButton from '../../Poster/SetStepButton';
import OrderSummary from '../../Commerce/OrderSummary';
import AddressFields from '../AddressFields';
import FormErrorMessage from '../FormErrorMessage';
import { STEP_REVIEW } from '../../../constants/checkoutSteps';
import { validate } from '../../../utils/formValidator';
import config from '../../../../storefront/config';
import ReactGA from 'react-ga';
import CardValidator from 'card-validator';

class PaymentForm extends PureComponent {

  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.state = {
      hasError: false,
      ccExpMonth: null,
      ccExpYear: null,
    }
  }

  gaEvent() {
    ReactGA.event({
      category: 'Checkout',
      action: 'Continue',
      label: 'Payment Form'
    });
  }

  handleFormSubmit() {
    let valid = validate(this.formEl);

    // If the form as a whole validated, check the card number.
    if (valid) {
      const cardValidation = CardValidator.number(this.props.orderInformation.billing.cardNumber);
      if (!cardValidation.isValid) {
        const inputs = this.formEl.elements;
        const errorEl = inputs["card-number"].parentNode.querySelector('.invalid-input');
        inputs["card-number"].classList.add('first-error');
        errorEl.textContent = "Please enter a valid credit card number.";
        errorEl.parentNode.classList.add('has-error');
        valid = false;
      }
    }

    this.setState({
      hasError: !valid
    });

    if (valid) {
      this.props.handleSetStep(STEP_REVIEW);
    }
    else {
      const firstError = document.getElementsByClassName('first-error');
      if (firstError.length) {
        firstError[0].focus();
      }
    }
  }

  handleBillingChange = (element) => {
    const val = element.target.value;
    const field = element.target.dataset.field;
    this.props.actions.updateBillingInformation(field, val);
  };

  handleSameAddressChange = (element) => {
    this.props.actions.updateBillingInformation(
      'sameAddressAsShipping', element.target.checked
    );
  };

  handleCardNumberChange = (field, value) => {
    this.props.actions.updateBillingInformation(field, value);
  };

  handleCCExpChange = (e) => {
    const field = e.target.name;
    const fieldVal = e.target.value;
    const expDate = this.splitDate();
    const monthVal = field === 'cc-exp-month' ? fieldVal : expDate[0];
    const yearVal = field === 'cc-exp-year' ? fieldVal : expDate[1];
    const value = `${monthVal}/${yearVal}`;
    this.props.actions.updateBillingInformation('cardExpiration', value);
  };

  splitDate = () => {
    const values = this.props.orderInformation.billing.cardExpiration.split('/');
    values.length = 2;

    return values;
  };

  render() {
    const { logoCheckout } = config;
    const expDate = this.splitDate();

    return (
      <Container className="checkout__step-2">
        <Row>
          <Logo size="default" source={logoCheckout}/>
        </Row>
        <Row>
          <Col
            xs="12"
            md="12"
            lg="8"
            className="checkout__card">
            <Card>
              <CardTitle className="checkout__title">
                <span>Payment Method</span>
                <span>2 of 3</span>
              </CardTitle>
              <CardBody>
                <Container>
                  <form ref={(form) => this.formEl = form}>
                    <Row>
                      <FormErrorMessage show={this.state.hasError} message={strings.paymentError}/>
                    </Row>
                    <Row className="checkout__credit-card-number">
                      <FormGroup className="numericFormGroup cc-field-group">
                        <Label for="card-number">Card Number</Label>
                        <CreditCardInput
                          cardNumberInputProps={{
                            value: this.props.orderInformation.billing.cardNumber,
                            onChange: (e) => this.handleCardNumberChange('cardNumber', e.target.value),
                            className: 'cc-number form-control',
                            required: true,
                          }}
                          cardExpiryInputRenderer={({ props }) => {
                            return (
                              <input {...props} type="hidden" />
                            )
                          }}
                          cardCVCInputRenderer={({ props }) => (
                            <input {...props} type="hidden" />
                          )}
                          containerClassName="cc-fields-container"
                          inputClassName="form-control"
                          fieldClassName="cc-fields form-group"
                          cardImageClassName="cc-fields-card-img"
                          invalidClassName="has-error"
                          dangerTextClassName="invalid-input-text"
                        />
                        <span className="invalid-input"/>
                      </FormGroup>
                    </Row>
                    <Row className="checkout__credit-card-info">
                      <FormGroup className="numericFormGroup">
                        <Label for="card-expiration-date">Expiration Date</Label>
                        <div className="cc-exp-select-fields">
                          <div className="select-wrapper cc-exp-select">
                            <Input
                              type="select"
                              name="cc-exp-month"
                              id="cc-exp-month"
                              aria-label="Card Expiration Month"
                              value={expDate[0]}
                              data-field="cardExpirationMonth"
                              onChange={this.handleCCExpChange}
                              required={true}
                            >
                              <option value="">MM</option>
                              {new Array(12).fill().map((val, i) => {
                                const value = String(i + 1).padStart(2, '0');
                                return <option key={value} value={value}>{value}</option>;
                              })}
                            </Input>
                            <span className="invalid-input"/>
                          </div>
                          <div className="select-wrapper cc-exp-select">
                            <Input
                              type="select"
                              name="cc-exp-year"
                              id="cc-exp-year"
                              aria-label="Card Expiration Year"
                              value={expDate[1]}
                              data-field="cardExpirationYear"
                              onChange={this.handleCCExpChange}
                              required={true}
                            >
                              <option value="">YY</option>
                              {new Array(20).fill().map((val, i) => {
                                const value = String(new Date().getFullYear() + i).slice(-2);
                                return <option key={value} value={value}>{value}</option>;
                              })}
                            </Input>
                            <span className="invalid-input"/>
                          </div>
                        </div>
                        <span className="invalid-input"/>
                      </FormGroup>
                      <FormGroup className="numericFormGroup">
                        <Label for="card-security-code">Security Code</Label>
                        <Input
                          type="number"
                          inputMode="numeric"
                          name="card-security-code"
                          id="card-security-code"
                          value={this.props.orderInformation.billing.cardSecurityCode}
                          data-field="cardSecurityCode"
                          onChange={this.handleBillingChange}
                          pattern="^[0-9]{1,4}$"
                          title="Please enter a valid security code"
                          required={true}/>
                        <span className="invalid-input"/>
                      </FormGroup>
                    </Row>
                    <Row>
                      <label className="custom-control checkbox checkout__billing-same-shipping">
                        <input
                          type="checkbox"
                          checked={this.props.orderInformation.billing.sameAddressAsShipping}
                          onChange={this.handleSameAddressChange}
                          id="permission-confirmation-checkbox"
                          className="custom-control-input"
                        />
                        <span className="checkbox-indicator"/>
                        <FormattedMessage {...strings.billingAddressSame} />
                      </label>
                    </Row>
                    <Row>
                      {!this.props.orderInformation.billing.sameAddressAsShipping &&
                      <AddressFields handleAddressChange={this.handleBillingChange}
                                     address={this.props.orderInformation.billing}/>}
                    </Row>
                  </form>
                </Container>
              </CardBody>
              <CardFooter>
                <SetStepButton
                  onClick={() => {
                    this.gaEvent();
                    this.handleFormSubmit();
                  }}
                  color="brand"
                  className="btn--change-step"
                  step={STEP_REVIEW}
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
                <OrderSummary shouldDisplayCheckoutButton={false} shouldDisplayTermsAndConditions={false}/>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

}

PaymentForm.propTypes = {
  actions: PropTypes.object,
  cart: PropTypes.object,
  orderInformation: PropTypes.object,
  handleSetStep: PropTypes.func,
  updateBillingInformation: PropTypes.func
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
)(PaymentForm);
