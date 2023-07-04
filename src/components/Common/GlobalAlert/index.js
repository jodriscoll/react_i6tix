import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';
import Icon from '../Icon';

const GlobalAlert = ({ alert, handleDismissAlert }) => {
    const { message, type = '' } = alert;

    const content = (
        <div className="global-alert">
            <Alert color={type}
                   isOpen
                   toggle={handleDismissAlert}>
                <Icon id={type === 'success' ? 'check' : 'exclamation'} />
                {message}
            </Alert>
        </div>
    );

    return message.length ? content : null;
};

GlobalAlert.propTypes = {
    alert: PropTypes.object,
    handleDismissAlert: PropTypes.func,
};


export default GlobalAlert;
