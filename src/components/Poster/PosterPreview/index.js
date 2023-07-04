import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line no-unused-vars
const PosterPreview = ({ item, handleGeneratePreview, preview = null }) => {
    const { image, title } = item;

    return (
        <div className="poster-template">
            <img src={preview ? preview : image} alt={title} />
        </div>
    );
};

PosterPreview.propTypes = {
    item: PropTypes.object,
    handleGeneratePreview: PropTypes.func,
    preview: PropTypes.string,
};


export default PosterPreview;
