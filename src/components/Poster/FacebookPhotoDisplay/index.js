import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classnames from 'classnames';
import Icon from '../../Common/Icon';
import strings from '../../../constants/strings.js';

const FacebookPhotoDisplay = ({ album, handleSelectAlbum, togglePhoto, selectedPhotos = [] }) => {
    const albumPhotos = album.photos.data.map((photo) => {
        const selected = selectedPhotos.length > 0 ? selectedPhotos.filter(selectedPhoto => selectedPhoto.id === photo.id).length : 0;
        return (
            <li className={classnames('facebook__image', 'selection-frame', [{ 'selection-frame--selected' : selected }])} key={photo.id }>
                <div className="selection-content">
                    <img src={photo.picture}
                         onClick={() => togglePhoto(photo)}
                         data-id={photo.id}
                         data-src={photo.source} />
                    {selected ? <span className="selected-label ">Selected</span> : '' }
                </div>
            </li>
        );
    });

    return (
        <div className="facebook__images">
            <div className="facebook__navbar">
                <div className="facebook__go-back"
                     onClick={() => handleSelectAlbum()}>
                    <Icon id="arrow-left" />
                    <span className="facebook__go-back__text">
                            <FormattedMessage {...strings.backButton} />
                        </span>
                </div>
                <div className="facebook__data">
                        <span className="cover-title">
                            {album.name}
                        </span>
                    <span className="cover-quantity">
                            <FormattedMessage
                                id="albumCount"
                                defaultMessage={`{count, number} {count, plural,
                                          one {item}
                                          other {items}
                                        }`}
                                values={{ count: Object.keys(album.photos.data).length }}
                            />
                        </span>
                </div>
            </div>
            <ul>
                {albumPhotos}
            </ul>
        </div>
    );
};

FacebookPhotoDisplay.propTypes = {
    album: PropTypes.object,
    togglePhoto: PropTypes.func,
    handleSelectAlbum: PropTypes.func,
    uploadSettings: PropTypes.object || PropTypes.array,
    frame: PropTypes.number,
    selectedPhotos: PropTypes.array,
};


export default FacebookPhotoDisplay;
