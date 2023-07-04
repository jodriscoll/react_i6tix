import React from 'react';
import PropTypes from 'prop-types';
import config from '../../../../storefront/config';

const Logo = ({ size = '', source = '' }) => {
    const { title } = config;

    return (
        <div className={`logo logo--size-${size}`}>
            <img
                src={source}
                alt={title}
                className="logo-img" />
        </div>
    );
};

Logo.propTypes = {
    size: PropTypes.string,
    source: PropTypes.string,
};


export default Logo;
