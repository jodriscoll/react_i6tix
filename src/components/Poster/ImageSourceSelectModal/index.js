import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import ImageSourceSelect from '../ImageSourceSelect';
import Icon from '../../Common/Icon';

class ImageSourceSelectModal extends Component {

    render() {
        const { isOpen = false, toggleModal, handleFinishUpload, handleFinishSocialDownload, handleFacebookUpload, handleInstagramUpload, uploadSettings, uploadedFiles = [], src = {}, frame = 0 } = this.props;
        const closeModal = <Icon id="close" onClick={toggleModal}/>;

        return (
            <div>
                <Modal isOpen={isOpen}
                       toggle={toggleModal}
                       external={closeModal}
                       className="modal__source-select social">
                    <ModalHeader>Select a photo source</ModalHeader>
                    <ModalBody>
                        <ImageSourceSelect handleFacebookUpload={handleFacebookUpload} handleInstagramUpload={handleInstagramUpload} handleFinishUpload={handleFinishUpload} handleFinishSocialDownload={handleFinishSocialDownload} uploadedFiles={uploadedFiles} src={src} frame={frame} uploadSettings={uploadSettings} multiple={false} />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={toggleModal}>
                            <span>Cancel</span>
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

ImageSourceSelectModal.propTypes = {
    isOpen: PropTypes.bool,
    toggleModal: PropTypes.func,
    finishUpload: PropTypes.func,
    handleFinishUpload: PropTypes.func,
    handleFinishSocialDownload: PropTypes.func,
    handleFacebookUpload: PropTypes.func,
    handleInstagramUpload: PropTypes.func,
    uploadedFiles: PropTypes.array,
    src: PropTypes.object,
    frame: PropTypes.number,
    uploadSettings: PropTypes.object,
};

export default ImageSourceSelectModal;
