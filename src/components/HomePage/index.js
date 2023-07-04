import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import shortid from 'shortid';
import classnames from 'classnames';
import EXIF from 'exif-js';
import * as actions from '../../actions/posterActions';
import * as alertActions from '../../actions/alertActions';
import * as facebookActions from '../../actions/facebookActions';
import * as instagramActions from '../../actions/instagramActions';
import PosterPersonalization from '../Poster/PosterPersonalization';
import CartLink from '../Commerce/CartLink';
import GlobalAlert from '../Common/GlobalAlert';
import fetchRemoteFile from '../../utils/remoteFileFetcher';
import { STEP_SELECT_IMAGES, STEP_CUSTOMIZE_TEMPLATE } from '../../constants/posterPersonalization.js';

function base64ToBuffer (base64) {
    let data = base64.replace(/^data:([^;]+);base64,/gim, '');
    let binaryData = atob(data);
    let byteArray = new Uint8Array(binaryData.length);
    for (let i = 0; i < binaryData.length; i++) {
        byteArray[i] = binaryData.charCodeAt(i);
    }
    return byteArray.buffer;
}

class HomePage extends Component {

    componentDidMount() {
        if (!this.props.poster.posterId) {
            const posterId = localStorage.getItem('posterId');
            if (posterId) {
                this.props.actions.selectPoster(posterId);
            }
            else {
                window.location = './';
            }

        }
    }

    handleDismissAlert = () => {
        this.props.alertActions.dismissAlert();
    };

    handleSetStep = (step) => {
        this.props.actions.setStep(step);
    };

    handleSelectInitialPoster = (posterId) => {
        this.props.actions.selectInitialPoster(posterId);
    };

    handleSelectPoster = (posterId) => {
        this.props.actions.selectPoster(posterId);
        this.props.actions.setStep(STEP_SELECT_IMAGES);
    };

    handleOpenImageSelect = (frame = -1) => {
        this.props.actions.selectFileSource(!this.props.poster.selectingFileSource);
        if (frame >= 0) {
            this.props.actions.setActiveFrame(frame);
        }
    };

    handleSelectTemplate = (selectedPosterId, templateId) => {
        this.props.actions.selectPoster(selectedPosterId);
        this.props.actions.selectTemplate(selectedPosterId, templateId);
    };

    validateImage = (file) => {
        const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
        return allowedTypes.includes(file.type);
    };

    handleIncorrectFileType = () => {
        this.props.alertActions.showAlert('Invalid file type. Please upload either a .png or .jpg.', 'danger');
    };

    handleIncorrectNumberOfImages = () => {
        this.props.alertActions.showAlert('Please fill out all photo frames or choose a different template.');
    };

    readFile = (file, done) => {
        const reader = new FileReader();
        reader.onload = function (e) {
            return done(e.target.result);
        };
        reader.readAsDataURL(file);
    };

    handleFileChange = (file) => {
        this.props.actions.changeFile(file);
    };

    finishFileUpload = (file, src, frame) => {
        const {finishUpload, changeFile} = this.props.actions;
        let image = new Image;
        image.onload = () => {
            let id = (typeof src.id === 'undefined' || src.id === "") ? shortid.generate() : src.id;
            finishUpload();

            let exif = EXIF.readFromBinaryFile(base64ToBuffer(image.src));
            let rotation = 0;

            switch(exif.Orientation) {
                case 1:
                case 2:
                    rotation = 0;
                    break;
                case 3:
                case 4:
                    rotation = 180;
                    break;
                case 5:
                    rotation = 270;
                    break;
                case 6:
                case 7:
                case 8:
                    rotation = 90;
                    break;
            }

            changeFile({
                ...src,
                id,
                file,
                frame,
                imageWidth: image.width,
                imageHeight: image.height,
                imageRotate: rotation
            });
        };
        image.src = file;
    };

    handleDroppedFile = (file, src, frame) => {
        if( this.validateImage(file) ) {
            this.readFile(file, (file) => {
                this.finishFileUpload(file, src, frame);
            });
        } else {
            this.handleIncorrectFileType();
        }
    };

    handleFinishUpload = (e, src, frame = null) => {
        const files = e.target.files;
        for (let i = 0; i < files.length; i++) {
            const file = files.item(i);
            if (this.validateImage(file) ) {
                const frameId = frame ? frame : i;
                const finishFileUpload = this.finishFileUpload;
                this.readFile(file, function (file) {
                    finishFileUpload(file, src, frameId);
                });
                this.props.actions.selectFileSource(false);
                if (this.props.poster.step === STEP_SELECT_IMAGES) {
                    this.handleSetStep(STEP_CUSTOMIZE_TEMPLATE);
                }
            } else {
                this.handleIncorrectFileType();
            }
        }
    };

    handleFinishSocialDownload = (files, src, frame) => {
        files.map((file, i) => {
            const frameId = frame ? frame : i;
            const finishFileUpload = this.finishFileUpload;
            fetchRemoteFile(file.source).then(data => {
                finishFileUpload(data, src, frameId);
            });
            this.props.actions.selectFileSource(false);
            if (this.props.poster.step === STEP_SELECT_IMAGES) {
                this.handleSetStep(STEP_CUSTOMIZE_TEMPLATE);
            }
        });
    };

    handleConfirmPermission = () => {
        this.props.actions.confirmPermission(!this.props.poster.permission);
    };

    handleFacebookModal = () => {
        this.props.facebookActions.toggleFacebookModal(!this.props.facebook.facebookModal);
    };

    handleInstagramModal = () => {
        this.props.instagramActions.toggleInstagramModal(!this.props.instagram.instagramModal);
    };

    handleAddPosterToCart = () => {
        if (typeof this.props.poster.id !== 'undefined' && this.props.poster.id.length > 0) {
            this.props.actions.updateCart(this.props.poster);
        }
        else {
            this.props.actions.addToCart(this.props.poster);
        }

        // Not really a fan of this, but the best we can do as the other option
        // is to re-render with a <Redirect> component.
        this.props.history.push('/cart');
    };

    handleGeneratePreview = ( preview) => {
        this.props.actions.generatePreview(preview);
    };

    handleGenerateThumbnail = (thumbnails) => {
        this.props.actions.generateThumbnails(thumbnails);
    };

    handleShowImageToolbar = (frame) => {
        this.props.actions.showImageToolbar(frame);
    };

    handleShowResWarning = (id) => {
        if (this.props.poster.frameWarnings.filter(frame => frame.id === id).length === 0) {
            this.props.actions.addFrameWarning(id);
        }
    };

    handleToggleResWarning = (id = null) => {
        this.props.actions.toggleFrameWarning(id);
    };

    handleRemoveResWarning = (id) => {
        this.props.actions.removeFrameWarning(id);
    };

    handleTextChange = (text) => {
        this.props.actions.saveText(text);
    };

    render() {
        const { poster, cart, alert } = this.props;
        const { items = [] } = cart;


        let posterPersonalization = null;
        if (poster.posterData) {
            posterPersonalization = (
                <PosterPersonalization
                    handleSetStep={this.handleSetStep}
                    handleSelectInitialPoster={this.handleSelectInitialPoster}
                    handleSelectPoster={this.handleSelectPoster}
                    handleOpenImageSelect={this.handleOpenImageSelect}
                    handleSelectTemplate={this.handleSelectTemplate}
                    handleDroppedFile={this.handleDroppedFile}
                    handleFinishUpload={this.handleFinishUpload}
                    handleFinishSocialDownload={this.handleFinishSocialDownload}
                    handleConfirmPermission={this.handleConfirmPermission}
                    handleAddPosterToCart={this.handleAddPosterToCart}
                    handleGeneratePreview={this.handleGeneratePreview}
                    handleGenerateThumbnail={this.handleGenerateThumbnail}
                    handleFileChange={this.handleFileChange}
                    handleShowImageToolbar={this.handleShowImageToolbar}
                    handleShowResWarning={this.handleShowResWarning}
                    handleToggleResWarning={this.handleToggleResWarning}
                    handleRemoveResWarning={this.handleRemoveResWarning}
                    handleFacebookModal={this.handleFacebookModal}
                    handleInstagramModal={this.handleInstagramModal}
                    handleTextChange={this.handleTextChange}
                    handleIncorrectNumberOfImages={this.handleIncorrectNumberOfImages}
                    showImageSelect={this.props.poster.selectingFileSource}
                    activeFrame={this.props.poster.activeFrame}
                    { ...poster }
                />
            );
        }

        return (
            <div className={classnames('poster-personalization-wrapper', `poster-step-${poster.step}`)} >
                <header className="poster-personalization-header">
                    <GlobalAlert alert={alert} handleDismissAlert={this.handleDismissAlert} />
                    <CartLink items={items} />
                </header>
                {posterPersonalization}
            </div>
        );
    }

}

HomePage.propTypes = {
    alertActions: PropTypes.object,
    alert: PropTypes.object,
    actions: PropTypes.object,
    poster: PropTypes.object,
    cart: PropTypes.object,
    history: PropTypes.object,
    facebookActions: PropTypes.object,
    facebook: PropTypes.object,
    instagramActions: PropTypes.object,
    instagram: PropTypes.object,
};


function mapStateToProps(state) {
    return {
        alert: state.alert,
        poster: state.poster,
        cart: state.cart,
        facebook: state.facebook,
        instagram: state.instagram,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch),
        alertActions: bindActionCreators(alertActions, dispatch),
        facebookActions: bindActionCreators(facebookActions, dispatch),
        instagramActions: bindActionCreators(instagramActions, dispatch),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePage);
