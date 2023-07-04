import React from 'react';
import PropTypes from 'prop-types';
import classnames from "classnames";

const InstagramPhotoDisplay = ({photos, togglePhoto, selectedPhotos = [] }) => {

    if (photos === null) {
        return (
            <div className="instagram__loading">
                <h1>Please wait, we are loading your photos.</h1>
            </div>
        );
    }

    if (photos.length === 0) {
        return (
            <div className="instagram__none">
                <h1>We were unable to load any photos from instagram for you. Please try one of our other methods.</h1>
            </div>
        );
    }

    const instagramPhotos = photos.map((photo) => {
        const selected = selectedPhotos.filter(selectedPhoto => selectedPhoto.id === photo.id).length;
        return (
            <li className={classnames('instagram__image selection-frame', [{ 'selection-frame--selected' : selected }])} key={photo.id}>
                <div className="selection-content">
                    <img src={photo.images.standard_resolution.url}
                         onClick={() => togglePhoto(photo)}
                         data-id={photo.id}
                         data-src={photo.images.standard_resolution.url} />
                    {selected ? <span className="selected-label">Selected</span> : '' }
                </div>
            </li>
        );
    });

    return (
        <div className="instagram__images">
            <ul>
                {instagramPhotos}
            </ul>
        </div>
    );
}

InstagramPhotoDisplay.propTypes = {
    handleUpload: PropTypes.func,
    togglePhoto: PropTypes.func,
    uploadSettings: PropTypes.object,
    frame: PropTypes.number,
    selectedPhotos: PropTypes.array,
    photos: PropTypes.array,
};

export default InstagramPhotoDisplay;
