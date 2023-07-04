import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../actions/cartActions';
import { Container, Row, FormGroup, Label, Input } from 'reactstrap';
import states from './states';
import countries from './countries';

class ShippingAddressForm extends Component {

    handleAddressChange = this.props.handleAddressChange;

    render() {
        const stateAbbrs = states.map(item => <option key={item.abbreviation} value={item.abbreviation}>{item.name}</option>);
        const countryAbbrs = countries.map(item => <option key={item.abbreviation} value={item.abbreviation}>{item.name}</option>);
        const addressValues = this.props.address;

        const stateSelector = (
          <Input type="select"
                 name="address-state"
                 id="address-state"
                 data-field="state"
                 autoComplete="address-level1"
                 onChange={this.handleAddressChange}
                 value={addressValues.state}
                 >
              {stateAbbrs}
          </Input>
        );

        const stateInput = (
          <Input type="text"
                 name="address-state"
                 id="address-state"
                 data-field="state"
                 autoComplete="address-level1"
                 onChange={this.handleAddressChange}
                 value={addressValues.state}
                 />
        );

        const isUnitedStates = addressValues.country == "US" || addressValues.country == "United States";

        const stateField = (
          !addressValues.country || isUnitedStates
        ) ? stateSelector : stateInput;

        return (
            <Container>
                <Row className="checkout__name">
                    <FormGroup>
                        <Label for="full-name">Full Name</Label>
                        <Input type="text"
                               name="full-name"
                               id="full-name"
                               data-field="fullName"
                               autoComplete="name"
                               onChange={this.handleAddressChange}
                               value={addressValues.fullName}
                               required={true} />
                        <span className="text-danger invalid-input" />
                    </FormGroup>
                </Row>
                <Row className="checkout__address">
                    <FormGroup>
                        <Label for="address-line-1">Address</Label>
                        <Input type="text"
                               name="address-line-1"
                               id="address-line-1"
                               data-field="addressLineOne"
                               autoComplete="address-line1"
                               onChange={this.handleAddressChange}
                               value={addressValues.addressLineOne}
                               required={true}/>
                        <span className="text-danger invalid-input" />
                    </FormGroup>
                </Row>
                <Row className="checkout__address2">
                    <FormGroup>
                        <Label for="address-line-2">Address Line 2 (Suite, Apt, etc.)</Label>
                        <Input type="text"
                               name="address-line-2"
                               id="address-line-2"
                               data-field="addressLineTwo"
                               autoComplete="address-line2"
                               onChange={this.handleAddressChange}
                               value={addressValues.addressLineTwo} />
                    </FormGroup>
                </Row>
                <Row className="checkout__country-city">
                    <FormGroup>
                        <Label for="address-city">City</Label>
                        <Input type="text"
                               name="address-city"
                               id="address-city"
                               data-field="city"
                               autoComplete="address-level2"
                               onChange={this.handleAddressChange}
                               value={addressValues.city}
                               required={true}/>
                        <span className="text-danger invalid-input" />
                    </FormGroup>
                </Row>
                <Row className="checkout__country-state">
                    <FormGroup>
                        <Label for="address-country">Country</Label>
                        <Input type="select"
                               name="address-country"
                               id="address-country"
                               data-field="country"
                               autoComplete="country-name"
                               onChange={this.handleAddressChange}
                               value={addressValues.country}
                               >
                            {countryAbbrs}
                        </Input>
                        <span className="text-danger invalid-input" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="address-state">{isUnitedStates ? "State" : "State/Province"}</Label>
                        {stateField}
                        <span className="text-danger invalid-input" />
                    </FormGroup>
                </Row>
                <Row className="checkout__zip">
                    <FormGroup>
                        <Label for="address-zip">{isUnitedStates ? "Zip Code" : "Zip/Postal Code"}</Label>
                        <Input
                            type="text"
                            inputMode="text"
                            name="address-zip"
                            id="address-zip"
                            data-field="zip"
                            autoComplete="postal-code"
                            onChange={this.handleAddressChange}
                            value={addressValues.zip}
                            required={true}/>
                        <span className="text-danger invalid-input" />
                    </FormGroup>
                </Row>
            </Container>
        );
    }
}

ShippingAddressForm.propTypes = {
    actions: PropTypes.object,
    cart: PropTypes.object,
    handleAddressChange: PropTypes.func,
    address: PropTypes.object,
};

function mapStateToProps(state) {
    return {
        cart: state.cart
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
