import React from 'react';
import PropTypes from 'prop-types';

const PosterSelectionLink = ({ children, className, gaEvent }) => {

    return (
        <a className={className} onClick={() => { gaEvent && gaEvent()}}  href='./'>{children}</a>
    );
};

PosterSelectionLink.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    gaEvent: PropTypes.func
};


export default PosterSelectionLink;
