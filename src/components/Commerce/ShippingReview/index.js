import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import strings from '../../../constants/strings.js';
import SetStepButton from '../../Poster/SetStepButton';
import { STEP_SHIPPING_ADDRESS } from '../../../constants/checkoutSteps';
import Currency from 'react-currency-formatter';
import AddressReview from '../AddressReview';
import Icon from '../../Common/Icon';

const ShippingReview = (props) => {
    const {
        handleSetStep,
        address,
        delivery,
    } = props;

    let deliveryCost = "";
    if (delivery.methodCost === 0) {
        deliveryCost = "FREE!";
    }
    else {
        deliveryCost = <Currency quantity={delivery.methodCost}/>;
    }

    return (
        <div className="checkout__delivery-review">
            <div>
                <h5>Delivery Method</h5>
                <AddressReview address={address} />
                <div className="shipping-method">
                    { delivery.methodName } - { deliveryCost }
                </div>
                <SetStepButton
                    color="edit"
                    step={STEP_SHIPPING_ADDRESS}
                    icon={<Icon id="edit"/>}
                    handleClick={handleSetStep}
                    text={<FormattedMessage {...strings.editButton} />}
                />
            </div>
        </div>
    );
};

ShippingReview.propTypes = {
    handleSetStep: PropTypes.func.isRequired,
    address: PropTypes.object.isRequired,
    delivery: PropTypes.object.isRequired,
};


export default ShippingReview;
