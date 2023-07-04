import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';


const FormErrorMessage = ({ show, message }) => {

    return show ? (
        <div className="form-group form-error">
            <i className="ico-exclamation" />
            <p><FormattedMessage {...message} /></p>
        </div>
    ) : null;
};

FormErrorMessage.propTypes = {
    show: PropTypes.bool,
    message: PropTypes.object,
};


export default FormErrorMessage;
