import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({ id = '' }) => {
    return (
        <i className={`ico ico-${id}`} aria-hidden="true" />
    );
};

Icon.propTypes = {
    id: PropTypes.string,
};


export default Icon;
