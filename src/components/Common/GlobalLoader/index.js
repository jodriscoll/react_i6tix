import React from 'react';
import PropTypes from 'prop-types';

const GlobalLoader = ({ show = true }) => {

    const styles = {
        display: (show) ? null : 'none'
    };

    return (
        <div className="global-loader" style={styles}>
            <span className="loader-block"></span>
            <span className="loader-block"></span>
            <span className="loader-block"></span>
            <span className="loader-block"></span>
            <span className="loader-block"></span>
            <span className="loader-block"></span>
            <span className="loader-block"></span>
            <span className="loader-block"></span>
            <span className="loader-block"></span>
        </div>
    );
};

GlobalLoader.propTypes = {
    show: PropTypes.bool,
};

export default GlobalLoader;
