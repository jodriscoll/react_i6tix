import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as actions from '../../../actions/posterActions';
import * as instagramActions from '../../../actions/instagramActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import InstagramPopupLogin from '../InstagramPopupLogin';
import InstagramPhotoDisplay from '../InstagramPhotoDisplay';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import Icon from '../../Common/Icon';
import config from '../../../../storefront/config.js';
import {FormattedMessage} from 'react-intl';
import strings from "../../../constants/strings";

class InstagramImageSourceModal extends Component {
    determineDisplay = () => {
        if (this.props.instagram.loginError) {
            return this.loginError();
        }
        else if (this.props.instagram.userAuthToken) {
            if (this.props.instagram.photos === null || this.props.instagram.photos.length === 0) {
                this.props.instagramActions.loadInstagramPhotos(config.instagramClientId, this.props.instagram.userAuthToken);
            }
            else {
                return (
                    <InstagramPhotoDisplay
                        frame={this.props.frame}
                        handleUpload={this.props.handleUpload}
                        uploadSettings={this.props.uploadSettings}
                        selectedPhotos={this.props.instagram.selectedPhotos}
                        togglePhoto={this.togglePhoto}
                        photos={this.props.instagram.photos}
                    />
                );
            }

        }
        else if(this.props.instagram.instagramModal) {
            return this.loginDisplay();
        } else {
            return this.loginError();
        }
    };

    loginDisplay = () => {
        return (
           <InstagramPopupLogin clientId={config.instagramClientId} redirectUri={window.location.protocol+'//'+window.location.hostname+(window.location.port ? ':'+window.location.port: '')}/>
        );
    };

    loginError = () => {
        return (
            <div className="instagram__error">
                <span>Oops! There was an error logging you in with Instagram. Please try one of our other image sources.</span>
            </div>
        );
    };

    modalToggle = () => {
        this.props.instagramActions.toggleInstagramModal();
    };

    togglePhoto = (photo) => {
        const {selectedPhotos} = this.props.instagram;
        if (selectedPhotos.filter(selected => selected.id === photo.id).length) {
            this.props.instagramActions.removeInstagramPhoto(photo.id);
        }
        else {
            if (!this.props.multiple) {
                this.props.instagramActions.removeInstagramPhotos();
            }
            this.props.instagramActions.selectInstagramPhoto(photo);
        }
    };

    handleFinishSocialDownload = () => {
        this.props.handleFinishSocialDownload(this.props.instagram.selectedPhotos, this.props.src, this.props.frame);
    };

    render() {
        const closeModal = <Icon id="close" onClick={this.modalToggle}/>;

        return (
            <Modal  isOpen={this.props.instagram.instagramModal}
                    toggle={this.modalToggle}
                    external={closeModal}
                    className="modal__instagram social">
                <ModalHeader>Choose Photos from Instagram</ModalHeader>
                <ModalBody>
                    { this.determineDisplay() }
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.modalToggle}>
                        <FormattedMessage {...strings.cancelButton} />
                    </Button>
                    <Button className="btn-okay" color="primary" onClick={this.handleFinishSocialDownload}>
                        <Icon id="check"/>
                        <FormattedMessage {...strings.okayButton} />
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

InstagramImageSourceModal.propTypes = {
    finishUpload: PropTypes.func,
    handleFinishUpload: PropTypes.func,
    handleFinishSocialDownload: PropTypes.func,
    uploadedFiles: PropTypes.array,
    handleUpload: PropTypes.func,
    uploadSettings: PropTypes.object,
    instagram: PropTypes.object,
    instagramActions: PropTypes.object,
    frame: PropTypes.number,
    src: PropTypes.object,
    multiple: PropTypes.bool,
};

function mapStateToProps(state) {
    return {
        instagram: state.instagram
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch),
        instagramActions: bindActionCreators(instagramActions, dispatch),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InstagramImageSourceModal);
