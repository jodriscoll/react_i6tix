import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';
import MediaQuery from 'react-responsive';
import {Container, Row, Col, Alert, Card, CardBody, CardTitle, CardFooter} from 'reactstrap';
import strings from '../../../constants/strings.js';
import {STEP_CUSTOMIZE_TEMPLATE, STEP_PREVIEW} from '../../../constants/posterPersonalization.js'
import SetStepButton from '../SetStepButton';
import ImageSourceSelect from '../ImageSourceSelect';
import Logo from '../../Common/Logo';
import Icon from '../../Common/Icon';
import GlobalLoader from '../../Common/GlobalLoader';
import Footer from '../../Common/Footer';
import PosterGrid from '../PosterGrid';
import PosterPreview from '../PosterPreview';
import PosterTemplate from '../PosterTemplate';
import config from '../../../../storefront/config';
import PermissionConfirmation from '../PermissionConfirmation';
import PosterSelectionLink from '../../Common/PosterSelectionLink';
import MobilePosterGrid from '../../Modals/MobilePosterGrid';
import html2canvas from 'html2canvas';
import ReactGA from 'react-ga';

class PosterPersonalization extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            posterTemplate: null
        };

        this.setPosterTemplate = element => {
            this.setState({
                posterTemplate: element
            });
        };
    }

    componentWillMount() {
        window.scrollTo(0, 0);
    }

    saveAdjustedImages = () => {
        if (this.state.posterTemplate) {
            for (let editorKey in this.state.posterTemplate.imageEditors) {
                if (this.state.posterTemplate.imageEditors[editorKey].editor === null) {
                    continue;
                }
                // Get the original canvas from React Avatar Editor.
                const originalCanvas = this.state.posterTemplate.imageEditors[editorKey].editor;
                const imageCanvas = originalCanvas.getImage();
                const imageString = imageCanvas.toDataURL();
                const image = new Image();
                image.onload = () => {
                    const desiredWidth = this.state.posterTemplate.imageEditors[editorKey].props.minimumDesiredImageWidth;
                    const desiredHeight = this.state.posterTemplate.imageEditors[editorKey].props.minimumDesiredImageHeight;
                    const canvasWidth = imageCanvas.width;
                    const canvasHeight = imageCanvas.height;
                    let newCanvasWidth = 0;
                    let newCanvasHeight = 0;
                    // If the image in the avatar editor is larger than the desired height/width (as defined by the height/
                    // width that trigger the resolution warning, then we cap the image size at that dimensions.  If the
                    // image is smaller (meaning the user got an image res warning), then we don't adjust the resulting
                    // image and send it in the largest size we have -- this allows for smaller images to be examined by the
                    // backend should a problem arise with them.
                    if (canvasHeight > desiredHeight || canvasWidth > desiredWidth) {
                        newCanvasHeight = desiredHeight;
                        newCanvasWidth = desiredWidth;
                    }
                    else {
                        newCanvasWidth = canvasWidth;
                        newCanvasHeight = canvasHeight;
                    }
                    const newCanvas = document.createElement('canvas');
                    newCanvas.width = newCanvasWidth;
                    newCanvas.height = newCanvasHeight;

                    // Code borrowed from React Avatar Editor getImage();
                    const context = newCanvas.getContext('2d');

                    context.mozImageSmoothingEnabled = true;
                    context.imageSmoothingQuality = "high";
                    context.webkitImageSmoothingEnabled = true;
                    context.msImageSmoothingEnabled = true;
                    context.imageSmoothingEnabled = true;

                    context.drawImage(image, 0, 0, newCanvasWidth, newCanvasHeight);

                    const thumbnailSrc = newCanvas.toDataURL();

                    this.props.handleGenerateThumbnail({id: editorKey, thumbnailSrc});
                };
                image.src = imageString;
            }
        }
    };

    handlePosterPreview = () => {
        const numOfImages = this.props.uploadedFiles.length;
        const numOfFrames = this.props.posterData.templates[this.props.templateId || 0].uploadSettings.length;

        if (numOfImages >= numOfFrames) {
            let poster = document.getElementById('poster-template');
            let editor = document.getElementsByClassName('edit-poster')[0];

            editor.classList.add('rendering');
            editor.classList.add('animation');
            // timeouts are to control animations
            setTimeout(() => {
                editor.classList.remove('animation');
                this.saveAdjustedImages();
                poster.style.transform = 'rotate(0deg) scale(1)';
                html2canvas(poster, { logging: false }).then(canvas => {
                    this.props.handleGeneratePreview(canvas.toDataURL());
                    setTimeout(() => {
                        this.props.handleSetStep(STEP_PREVIEW);
                        editor.classList.remove('rendering');
                    }, 1000);
                });
            }, 500);

        } else {
            this.props.handleIncorrectNumberOfImages();
        }
    };

    posterStep = () => {

        const {
            step = 1,
            posterId = 0,
            posterData = null,
            templateId = 0,
            uploadingFiles = false,
            uploadError = false,
            errorMessage = '',
            uploadedFiles = [],
            text = [],
            showImageToolbar = null,
            preview = null,
            permission = false,
            handleSetStep,
            handleSelectTemplate,
            handleFinishUpload,
            handleDroppedFile,
            handleOpenImageSelect,
            handleFinishSocialDownload,
            handleConfirmPermission,
            handleAddPosterToCart,
            handleGeneratePreview,
            handleGenerateThumbnail,
            handleFileChange,
            handleShowImageToolbar,
            frameWarnings,
            showFrameWarning,
            showImageSelect,
            handleShowResWarning,
            handleToggleResWarning,
            handleRemoveResWarning,
            handleFacebookModal,
            handleInstagramModal,
            handleTextChange,
            activeFrame,
        } = this.props;

        const maxPhotoCount = posterData.templates[templateId].uploadSettings.length;
        const { logoSm } = config;
        const posterHelp = (
            <div className="poster-help">
                <FormattedMessage
                    values={{
                        bold: <b>Customize Your Design</b>,
                        italic: <em>Click on a photo or text area to modify it!</em>
                    }}
                    {...strings.editPosterCustomizationText} />
            </div>
        );

        switch (step) {

            // step 2 – customize your poster with your selected images
            case STEP_CUSTOMIZE_TEMPLATE:

                return (
                    <div className="poster-personalization__step edit-poster">
                        <Container>
                            <Row>
                                <Col xs="12"
                                     lg="5"
                                     className="poster-grid__wrapper">
                                    <PosterGrid posterData={posterData}
                                                templateId={templateId}
                                                posterId={posterId}
                                                handleClick={handleSelectTemplate}
                                                handleGenerateThumbnail={handleGenerateThumbnail} />
                                </Col>
                                <Col xs="12"
                                     lg={{ size: 6, offset: 1 }}
                                     className="poster-editor">
                                    <MediaQuery maxWidth={992}>
                                        {posterHelp}
                                    </MediaQuery>
                                    <PosterTemplate item={posterData.templates[templateId]}
                                                    files={uploadedFiles}
                                                    text={text}
                                                    handleFinishUpload={handleFinishUpload}
                                                    handleDroppedFile={handleDroppedFile}
                                                    handleFileChange={handleFileChange}
                                                    handleShowImageToolbar={handleShowImageToolbar}
                                                    showImageToolbar={showImageToolbar}
                                                    showImageSelect={showImageSelect}
                                                    frameWarnings={frameWarnings}
                                                    handleShowResWarning={handleShowResWarning}
                                                    handleToggleResWarning={handleToggleResWarning}
                                                    handleRemoveResWarning={handleRemoveResWarning}
                                                    showFrameWarning={showFrameWarning}
                                                    handleTextChange={handleTextChange}
                                                    handleFinishSocialDownload={handleFinishSocialDownload}
                                                    handleFacebookUpload={handleFacebookModal}
                                                    handleInstagramUpload={handleInstagramModal}
                                                    handleOpenImageSelect={handleOpenImageSelect}
                                                    activeFrame={activeFrame}
                                                    ref={this.setPosterTemplate} />
                                    <GlobalLoader />
                                    <MediaQuery minWidth={992}>
                                        {posterHelp}
                                    </MediaQuery>
                                </Col>
                            </Row>
                        </Container>
                        <PosterSelectionLink className="btn btn-brand btn--change-step btn--back">
                            <FormattedMessage {...strings.backButton} />
                        </PosterSelectionLink>
                        <div id="poster-buttons"
                             className="poster-buttons__container">
                            <MobilePosterGrid>
                                <PosterGrid posterData={posterData}
                                            templateId={templateId}
                                            posterId={posterId}
                                            handleClick={handleSelectTemplate}
                                            handleGenerateThumbnail={handleGenerateThumbnail} />
                            </MobilePosterGrid>
                            <SetStepButton color="brand"
                                           className="btn--change-step btn--next"
                                           step={STEP_CUSTOMIZE_TEMPLATE + 1}
                                           handleClick={this.handlePosterPreview}
                                           text={<FormattedMessage {...strings.purchaseButton} />} />
                        </div>
                    </div>
                );

            // step 3 – preview your newly created poster
            case STEP_PREVIEW:
                return (
                    <div className="poster-personalization__step preview-poster">
                        <Container>
                            <Row>
                                <Col xs="12"
                                     lg="6">
                                    <PosterPreview item={posterData.templates[templateId]}
                                                   preview={preview}
                                                   handleGeneratePreview={handleGeneratePreview}
                                                   text={text} />
                                    { text.length && text[0].text !== ""
                                        ? <div className="instructors">
                                            <img src="images/instructors/finished-design.svg"
                                                 className="instructors finished-design"
                                                 alt="Your finished design" />
                                        </div>
                                        : <div className="instructors">
                                            <img src="images/instructors/message-reminder.svg"
                                                 className="instructors message-reminder"
                                                 alt="Did you know you can add a message?" />
                                        </div>
                                    }
                                </Col>
                                <Col xs="12"
                                     lg={{ size: 5, offset: 1 }}>
                                    <PermissionConfirmation permission={permission}
                                                            handleChange={handleConfirmPermission}
                                                            handleSetStep={handleSetStep}
                                                            handleAddPosterToCart={handleAddPosterToCart} />
                                    <Footer />
                                </Col>
                            </Row>
                        </Container>
                        <SetStepButton color="brand"
                                       className="btn--change-step btn--back"
                                       step={STEP_PREVIEW - 1}
                                       handleClick={() => {
                                           handleSetStep(STEP_PREVIEW - 1);
                                       }}
                                       text={<FormattedMessage {...strings.backButton} />} />
                    </div>
                );

            // step 1 - select your images for your poster
            default:

                return (
                    <div className="poster-personalization__step select-images">
                        <Container>
                            { errorMessage
                                ? <Alert color="danger">{errorMessage}</Alert>
                                : ''
                            }
                            <Row>
                                <Col xs="12"
                                     lg="5"
                                     className="image-source-selection">
                                    <Logo size="small" source={logoSm} />
                                    <Card>
                                        <CardBody>
                                            <CardTitle className="text-center">
                                                <FormattedMessage
                                                    values={{
                                                        count: maxPhotoCount
                                                    }}
                                                    {...strings.selectImageSourceHeader} />
                                            </CardTitle>
                                            <ImageSourceSelect posterId={posterId}
                                                               handleFinishUpload={handleFinishUpload}
                                                               uploadingFiles={uploadingFiles}
                                                               uploadError={uploadError}
                                                               uploadedFiles={uploadedFiles}
                                                               handleFacebookUpload={handleFacebookModal}
                                                               handleInstagramUpload={handleInstagramModal}
                                                               handleFinishSocialDownload={handleFinishSocialDownload}
                                                               uploadSettings={posterData.templates[templateId]}
                                                               multiple={true}
                                            />
                                        </CardBody>
                                        <CardFooter className="text-center">
                                            <PosterSelectionLink>
                                                <Icon id="arrow-left"/>
                                                Go Back
                                            </PosterSelectionLink>
                                        </CardFooter>
                                    </Card>
                                    <div className="instructors">
                                        <img src="images/instructors/get-started.svg"
                                             className="instructors get-started"
                                             alt="Let's get started" />
                                    </div>
                                </Col>
                                <Col sm="12"
                                     lg="7"
                                     className="poster-display">
                                    <img src={posterData.templates[templateId].posterWells}
                                         height="854"
                                         alt={posterData.title} />
                                </Col>
                            </Row>
                        </Container>
                        <PosterSelectionLink className="btn btn-brand btn--change-step btn--back"
                                             gaEvent={() => {
                                                 ReactGA.event({
                                                     category: 'Source Selection',
                                                     action: 'Return to storefront button'
                                                 });
                                             }}>
                            <FormattedMessage {...strings.backButton} />
                        </PosterSelectionLink>
                    </div>
                );
        }
    };

    render() {
        const posterStep = this.posterStep();

        return (
            <div className="poster-personalization">
                {posterStep}
            </div>
        );
    }

}

PosterPersonalization.propTypes = {
    step: PropTypes.number,
    posterId: PropTypes.string,
    posterData: PropTypes.object,
    templateId: PropTypes.number,
    selectedPosterId: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]),
    selectingFileSource: PropTypes.bool,
    uploadingFiles: PropTypes.bool,
    uploadError: PropTypes.bool,
    errorMessage: PropTypes.string,
    uploadedFiles: PropTypes.array,
    text: PropTypes.array,
    showImageToolbar: PropTypes.number,
    preview: PropTypes.string,
    permission: PropTypes.bool,
    handleSetStep: PropTypes.func,
    handleSelectPoster: PropTypes.func,
    handleSelectTemplate: PropTypes.func,
    handleFinishUpload: PropTypes.func,
    handleFinishSocialDownload: PropTypes.func,
    handleFileChange: PropTypes.func,
    handleDroppedFile: PropTypes.func,
    handleConfirmPermission: PropTypes.func,
    handleOpenImageSelect: PropTypes.func,
    handleAddPosterToCart: PropTypes.func,
    handleGenerateThumbnail: PropTypes.func,
    modalToggle: PropTypes.func,
    handleGeneratePreview: PropTypes.func,
    handleShowImageToolbar: PropTypes.func,
    handleFacebookModal: PropTypes.func,
    handleInstagramModal: PropTypes.func,
    handleTextChange: PropTypes.func,
    handleIncorrectNumberOfImages: PropTypes.func,
    handleShowResWarning: PropTypes.func,
    handleToggleResWarning: PropTypes.func,
    handleRemoveResWarning: PropTypes.func,
    frameWarnings: PropTypes.array,
    showFrameWarning: PropTypes.number,
    showImageSelect: PropTypes.bool,
    activeFrame: PropTypes.number,
    thumbnails: PropTypes.array,
};

export default PosterPersonalization;
