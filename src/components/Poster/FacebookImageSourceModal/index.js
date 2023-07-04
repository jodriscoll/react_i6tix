import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {FormattedMessage} from 'react-intl';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'reactstrap';
import FacebookProvider, {Login} from 'react-facebook-sdk';
import * as actions from '../../../actions/posterActions';
import * as facebookActions from '../../../actions/facebookActions';
import FacebookPhotoDisplay from '../FacebookPhotoDisplay';
import Icon from '../../Common/Icon';
import strings from '../../../constants/strings.js';
import config from '../../../../storefront/config.js';

class FacebookImageSourceModal extends Component {

    hasLoaded = false;

    handleLoginResponse = (data) => {
        this.props.facebookActions.facebookLoginSuccess({
            userAuthToken: data.tokenDetail.accessToken,
            userLoginError: false,
            userId: data.tokenDetail.userId,
        });
    };

    handleLoginError = () => {
        this.props.facebookActions.facebookLoginError({
            userAuthToken: "",
            userLoginError: true,
            userId: "",
        });
    };

    handleFinishSocialDownload = () => {
        this.props.handleFinishSocialDownload(this.props.facebook.selectedPhotos, this.props.src, this.props.frame);
    };

    selectAlbum = (album = '') => {
        this.props.facebookActions.selectFacebookAlbum(album);
    };

    togglePhoto = (photo) => {
        const {selectedPhotos} = this.props.facebook;
        if (selectedPhotos.length && selectedPhotos.filter(selected => selected.id === photo.id).length) {
            this.props.facebookActions.removeFacebookPhoto(photo.id);
        }
        else {
            if (!this.props.multiple) {
                this.props.facebookActions.removeFacebookPhotos();
            }
            this.props.facebookActions.selectFacebookPhoto(photo);
        }
    };

    determineDisplay = () => {

        const {facebook, facebookActions} = this.props;

        if (facebook.loginError) {
            return this.loginError();
        }
        else if (facebook.userAuthToken
            && facebook.selectedAlbum === "") {
            if (facebook.albums.length === 0) {
                facebookActions.loadFacebookData().then(() => {
                    this.hasLoaded = true;
                });
            }
            if (facebook.albums.length > 0) {
                // filter out empty albums to negate
                // missing object key errors
                let albums = facebook.albums.filter((a) => (a.photos));
                return this.albumDisplay(albums);
            }
            else if (this.hasLoaded === true) {
                return this.noAlbumDisplay();
            }
            return this.isLoadingDisplay();
        }
        else if (facebook.userAuthToken
            && facebook.selectedAlbum) {
            return (
                <FacebookPhotoDisplay
                    album={facebook.selectedAlbum}
                    uploadSettings={this.props.uploadSettings}
                    handleSelectAlbum={this.selectAlbum}
                    togglePhoto={this.togglePhoto}
                    selectedPhotos={facebook.selectedPhotos}
                    frame={this.props.frame}
                />
            )
        }
        else {
            return this.loginDisplay();
        }
    };

    isLoadingDisplay = () => {
        return (
            <div className="facebook__loading">
                <h1><FormattedMessage {...strings.facebookModalLoading} /></h1>
            </div>
        );
    };

    loginDisplay = () => {
        return (
            <Login
                scope="user_photos"
                onResponse={this.handleLoginResponse}
                onError={this.handleLoginError}
                render={({isLoading, isWorking, onClick}) => (
                    <div className="facebook__login">
                        <h1><FormattedMessage {...strings.facebookModalLoginHeader} /></h1>
                        <Button color="facebook"
                                onClick={onClick}>
                            {!(isLoading || isWorking) && (
                                <span>Continue With Facebook</span>
                            )}
                            {(isLoading || isWorking) && (
                                <span>Loading...</span>
                            )}
                        </Button>
                    </div>
                )}
            />
        );
    };

    loginError = () => {
        return (
            <div className="facebook__error">
                <h1><FormattedMessage {...strings.facebookModalLoginError} /></h1>
            </div>
        );
    };

    albumDisplay = (albums) => {
        return (
            <div className="facebook__albums">
                <ul>
                    {albums.map(item =>
                        <li key={item.id}
                            onClick={() => this.selectAlbum(item)}
                            data-id={item.id}
                            className="facebook__album">
                            <div className="facebook__cover">
                                <img src={
                                    (item.cover_photo) ? item.cover_photo.picture : null
                                } alt={item.name}/>
                            </div>
                            <div className="facebook__data">
                                <h4 className="cover-title">{item.name}</h4>
                                <span className="cover-quantity">
                                    <FormattedMessage
                                        id="albumCount"
                                        defaultMessage={`{count, number} {count, plural,
                                            one {item}
                                            other {items}
                                            }`}
                                        values={{count: item.photos ? Object.keys(item.photos.data).length : 0}}
                                    />
                                </span>
                            </div>
                        </li>
                    )}
                </ul>
            </div>
        );
    };

    noAlbumDisplay = () => {
        return (
            <div className="facebook__no-albums">
                <h1>It does not look like you have any albums on Facebook.</h1>
            </div>
        );
    };

    modalToggle = () => {
        this.props.facebookActions.toggleFacebookModal();
    };

    render() {
        const closeModal = <Icon id="close"
                                 onClick={this.modalToggle} />;

        return (
            <div>
                <Modal isOpen={this.props.facebook.facebookModal}
                       toggle={this.modalToggle}
                       external={closeModal}
                       className="modal__facebook social">
                    <ModalHeader><FormattedMessage {...strings.facebookModalHeader} /></ModalHeader>
                    <ModalBody>
                        <FacebookProvider appId={config.facebookClientId}>
                            { this.determineDisplay() }
                        </FacebookProvider>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary"
                                onClick={this.modalToggle}>
                            <FormattedMessage {...strings.cancelButton} />
                        </Button>
                        <Button className="btn-okay"
                                color="primary"
                                onClick={this.handleFinishSocialDownload}>
                            <Icon id="check"/>
                            <FormattedMessage {...strings.okayButton} />
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

FacebookImageSourceModal.propTypes = {
    finishUpload: PropTypes.func,
    handleFinishUpload: PropTypes.func,
    uploadedFiles: PropTypes.array,
    handleFacebookUpload: PropTypes.func,
    facebook: PropTypes.object,
    facebookActions: PropTypes.object,
    handleFinishSocialDownload: PropTypes.func,
    uploadSettings: PropTypes.object,
    frame: PropTypes.number,
    src: PropTypes.object,
    multiple: PropTypes.bool,
};

function mapStateToProps(state) {
    return {
        facebook: state.facebook
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch),
        facebookActions: bindActionCreators(facebookActions, dispatch),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FacebookImageSourceModal);
