import React from 'react';
import PropTypes from 'prop-types';

const AddressReview = (props) => {

    const {
        address,
    } = props;

    return (
        <div className="address">
            <span>{ address.fullName }</span>
            <span>{ address.addressLineOne }</span>
            <span>{ address.addressLineTwo }</span>
            <span>{ address.city}, {address.state} {address.zip}</span>
            <span>{ address.country }</span>
            <span>{ address.phone }</span>
        </div>
    );
};

AddressReview.propTypes = {
    address: PropTypes.object.isRequired,
};


export default AddressReview;
