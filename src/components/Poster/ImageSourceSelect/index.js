import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Button, CustomInput } from 'reactstrap';
import Icon from '../../Common/Icon';
import strings from '../../../constants/strings.js';
import FacebookImageSourceModal from '../FacebookImageSourceModal';
import InstagramImageSourceModal from '../InstagramImageSourceModal';
import ReactGA from 'react-ga';
import config from '../../../../storefront/config';

const ImageSourceSelect = ({ handleFinishUpload, handleFacebookUpload, handleInstagramUpload, handleFinishSocialDownload, uploadSettings = [], src = {}, frame = null, multiple = false }) => {

    function gaEvent(type) {
        ReactGA.event({
            category: 'Source Selection',
            action: 'Selection of photo source',
            label: type
        });
    }

    if (Object.keys(src).length === 0 && src.constructor === Object) {
        src = uploadSettings.uploadSettings[0];
    }

    return (
        <div className="source-selection">
            <Button onClick={() => {
                gaEvent('Computer');
                document.getElementById('selectImage').click();
            }}>
                <Icon id="computer" />
                <FormattedMessage { ...strings.selectImageSourceComputer } />
                <CustomInput
                    type="file"
                    id="selectImage"
                    name="image"
                    onChange={(e) => {
                        handleFinishUpload(e, src, frame);
                        // clear chosen file
                        e.target.value = null;
                    }}
                    label="Photo"
                    className="sr-only"
                    multiple={multiple}
                />
            </Button>
            {
                config.facebookClientId &&
                <Button onClick={() => {
                    gaEvent('Facebook');
                    handleFacebookUpload();
                }}>
                    <Icon id="facebook" />
                    <FormattedMessage {...strings.selectImageSourceFacebook} />
                    <FacebookImageSourceModal
                        handleFinishSocialDownload={handleFinishSocialDownload}
                        uploadSettings={uploadSettings}
                        src={src}
                        frame={frame}
                        multiple={multiple} />
                </Button>
            }
            {
                !config.facebookClientId &&
                <Button onClick={() => {
                    gaEvent('Facebook Coming Soon');
                }}>
                    <Icon id="facebook" />
                    <FormattedMessage {...strings.selectImageSourceFacebookSoon} />
                </Button>
            }
            <Button onClick={() => {
                gaEvent('Instagram');
                handleInstagramUpload();
            }}>
                <Icon id="instagram" />
                <FormattedMessage {...strings.selectImageSourceInstagram} />
                <InstagramImageSourceModal
                    handleFinishSocialDownload={handleFinishSocialDownload}
                    uploadSettings={uploadSettings}
                    src={src}
                    frame={frame}
                    multiple={multiple} />
            </Button>
        </div>
    );

};

ImageSourceSelect.propTypes = {
    finishUpload: PropTypes.func,
    handleFinishUpload: PropTypes.func,
    uploadedFiles: PropTypes.array,
    handleFacebookUpload: PropTypes.func,
    handleInstagramUpload: PropTypes.func,
    handleFinishSocialDownload: PropTypes.func,
    uploadSettings: PropTypes.object,
    src: PropTypes.object,
    frame: PropTypes.number,
    multiple: PropTypes.bool,
};

export default ImageSourceSelect;
