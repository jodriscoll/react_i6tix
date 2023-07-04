import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import strings from '../../../constants/strings.js';
import SetStepButton from '../../Poster/SetStepButton';
import { STEP_PAYMENT_METHOD } from '../../../constants/checkoutSteps';
import creditCardType from 'credit-card-type';
import AddressReview from '../AddressReview';
import Icon from '../../Common/Icon';

const PaymentReview = (props) => {
    const { cardNumber } = props.billing;
    const { handleSetStep } = props;

    /**
     * Necessary to catch a card type that was not found
     * using the credit-card-type package
     */
    const unkownCardType = [{
        niceType: 'Unknown',
        type: 'unkown',
        gaps: [ 4, 8, 12 ],
        length: [16],
        code: { name: 'CVV', size: 3 }
    }];

    let cardType = creditCardType(cardNumber.replace(/\s/g, ''));
    cardType = (cardType.length > 0) ? cardType : unkownCardType;

    const lastFour = cardNumber.replace(/\s/g, '').substr(cardType[0].gaps[cardType[0].gaps.length - 1]);

    return (
        <div className="checkout__payment-review">
            <div>
                <h5>Payment Method</h5>
                <div className="review-payment__main">
                    <span className="review-payment__method">{cardType[0].niceType} - {lastFour}</span>
                </div>

                <h5>Billing Address</h5>
                <div>
                    {props.billing.sameAddressAsShipping && <span>Same as shipping address.</span>}
                    {!props.billing.sameAddressAsShipping && <AddressReview address={props.billing} />}
                </div>
                <SetStepButton
                    color="edit"
                    step={STEP_PAYMENT_METHOD}
                    icon={<Icon id="edit"/>}
                    handleClick={handleSetStep}
                    text={<FormattedMessage {...strings.editButton} />}
                />
            </div>
        </div>
    );
};

PaymentReview.propTypes = {
    billing: PropTypes.object.isRequired,
    handleSetStep: PropTypes.func.isRequired,
    handleClick: PropTypes.func,
};

export default PaymentReview;
