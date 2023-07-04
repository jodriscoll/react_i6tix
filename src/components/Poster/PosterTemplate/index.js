import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';
import Hammer from 'react-hammerjs';
import {Input, Container, Button} from 'reactstrap';
import ImageToolbar from '../ImageToolbar';
import ImageDropzone from '../ImageDropzone';
import Icon from '../../Common/Icon';
import ImageFrame from '../ImageFrame';
import ImageResWarning from '../ImageResWarning';
import ImageSourceSelectModal from '../ImageSourceSelectModal';

class PosterTemplate extends Component {

    constructor(props) {
        super(props);

        this.imageEditors = [];

        this.state = {};
    }

    componentWillReceiveProps() {
        // update on re-render
        this.addImageEditor = element => {
            if (element) {
                this.imageEditors[element.props.i] = element;
            }
        }
    }

    gaEvent = (action) => {
        ReactGA.event({
            category: 'Poster Editor',
            action: action
        });
    };

    render() {

        const {
            item,
            files = [],
            text = [],
            handleFinishUpload,
            handleOpenImageSelect,
            handleFinishSocialDownload,
            handleFacebookUpload,
            handleInstagramUpload,
            handleDroppedFile,
            handleFileChange,
            handleShowImageToolbar,
            showImageToolbar,
            handleTextChange,
            frameWarnings,
            handleShowResWarning,
            handleToggleResWarning,
            handleRemoveResWarning,
            showFrameWarning,
            activeFrame,
            showImageSelect = false,
        } = this.props;

        const {image: templateImage, width: templateWidth, height: templateHeight, uploadSettings, textSettings } = item;

        const frames = uploadSettings.map((frame, i) => {
            // photo for this specific frame
            let upload = null;

            if (files.length) {
                const uploadFile = files.filter(uploadedFile => uploadedFile.frame === i);
                if (uploadFile.length) {
                    upload = uploadFile[0];
                }
            }

            let src = frame;

            if (upload) {
                src = {...frame, ...upload};
            }

            const {width, height, x, y, minimumPreferredWidth, minimumPreferredHeight, dpiRatio } = frame;
            
            let {imageRotate = 0, rotate = 0, scale = 1, file = null, position } = src;

            const frameStyle = {
                top: y,
                left: x,
                width,
                height,
            };

            // keep rotation in [0...360]
            imageRotate = imageRotate % 360;

            let imageWidth = Math.abs(imageRotate % 180) === 0 ? width : height;
            let imageHeight = Math.abs(imageRotate % 180) === 0 ? height : width;

            const warningButton = (
                <Button style={{top: y + height / 2, left: x + width / 2}}
                        color="brand"
                        id={`poster-frame-warning-indicator-${i}`}
                        className="poster-frame-warning-indicator"
                        onClick={() => handleToggleResWarning(i)}>
                    <Icon id="exclamation"/>
                </Button>
            );

            const hammerConfig = {
                recognizers: {
                    pinch: {enable: true},
                    doubletap: {enable: true}
                }
            };

            const onPinchIn = () => {
                if (handleFileChange) {
                    handleFileChange({...src, scale: Math.max(scale - 0.025, 0.1)});
                }
            };

            const onPinchOut = () => {
                if (handleFileChange) {
                    handleFileChange({...src, scale: scale + 0.025});
                }
            };

            const onTap = (e) => {
                if (e && e.tapCount === 1) {
                    handleShowImageToolbar(i);
                }
            };

            const handleFilePositionChange = (position) => {
                handleFileChange({...src, position});
            };

            return (
                <Container key={i}
                           className="poster-frame-container"
                           id={`poster-frame-container-${i}`} >
                    <div key={i}
                         id={`poster-frame-${i}`}
                         className={`poster-frame poster-frame--${file ? 'has-image' : 'no-image'}`}
                         style={frameStyle}
                         onClick={() => {
                             this.gaEvent('Clicked photo import area');
                             if (file) {
                                 handleShowImageToolbar(i);
                             }
                             else {
                                 handleOpenImageSelect(i);
                             }
                         }}>
                        <ImageToolbar handleInstagramUpload={handleInstagramUpload}
                                      handleFacebookUpload={handleFacebookUpload}
                                      handleFileChange={handleFileChange}
                                      handleFinishUpload={handleFinishUpload}
                                      handleFinishSocialDownload={handleFinishSocialDownload}
                                      uploadSettings={item}
                                      src={src}
                                      imageRotate={imageRotate}
                                      scale={scale}
                                      frame={i}
                                      show={showImageToolbar === i}
                                      toggle={handleShowImageToolbar}
                                      modalToggle={handleOpenImageSelect}
                                      ref={this.setImageToolbarRef} />
                        <ImageDropzone
                            handleDroppedFile={handleDroppedFile}
                            width={width}
                            height={height}
                            rotate={rotate}
                            src={src}
                            frame={i} >
                            <Hammer options={hammerConfig}
                                    onPinchIn={onPinchIn}
                                    onPinchOut={onPinchOut}
                                    onTap={onTap} >
                                <div className="poster-frame__container">
                                    <ImageFrame
                                        ref={this.addImageEditor}
                                        file={file}
                                        frame={frame}
                                        imageWidth={imageWidth}
                                        imageHeight={imageHeight}
                                        scale={scale}
                                        imageRotate={imageRotate}
                                        position={position}
                                        upload={upload}
                                        i={i}
                                        minimumDesiredImageHeight={minimumPreferredHeight}
                                        minimumDesiredImageWidth={minimumPreferredWidth}
                                        dpiRatio={dpiRatio}
                                        handleShowResWarning={handleShowResWarning}
                                        handleRemoveResWarning={handleRemoveResWarning}
                                        handleFilePositionChange={handleFilePositionChange} />
                                </div>
                            </Hammer>
                        </ImageDropzone>
                    </div>
                    { frameWarnings.filter(warning => warning.id === i).length
                        ? warningButton
                        : ''
                    }
                </Container>
            );
        });

        const onTextChange = (event) => {

            let acceptedValue = event.target.value.replace(
                /[^\x20-\x7F\x80-\xA5\xD2-\xD4\xE3-\xE4\xE9-\xED]/g,
                ''
            );

            const newText = {
                frame: parseInt(event.target.dataset.frame),
                text: acceptedValue,
            };

            handleTextChange(newText);

        };

        const textFrames = textSettings.map((frame, i) => {
            let enteredText = "";

            if (text.length) {
                const providedText = text.filter(textItem => textItem.frame === i);

                if (providedText.length) {
                    enteredText = providedText[0].text;
                }
            }

            const frameStyle = {
                height: frame.height,
                left: frame.x,
                top: frame.y,
                width: frame.width,
            };

            const textStyle = {
                fontSize: frame.fontSize,
                height: frame.height,
                width: frame.width,
            };

            return (
                <div key={i}
                     id={`poster-template__frame--${i}`}
                     className={`poster-template__frame poster-template__frame--${ enteredText ? 'has-text' : 'no-text' }`}
                     style={frameStyle} >
                    <Input type="text"
                           onFocus={() => this.gaEvent('User interacted with text input')}
                           value={enteredText}
                           maxLength={frame.maxLength}
                           style={textStyle}
                           data-frame={i}
                           placeholder="Add a message!"
                           data-html2canvas-ignore={ enteredText ? undefined : '' }
                           onChange={onTextChange} />
                </div>
            );
        });

        const posterStyle = {
            backgroundImage: `url(${templateImage})`,
            width: templateWidth,
            height: templateHeight,
            minHeight: templateHeight
        };

        let containerStyle = {
            height: templateHeight,
            width: templateWidth
        };

        if(window.innerWidth < 992) {
            containerStyle = Object.assign(containerStyle, {
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)'
            });
        }

        const aspectRatio = templateHeight / templateWidth;

        if (this.posterTemplateContainer) {

            window.posterTemplateContainer = this.posterTemplateContainer;
            const ownStyle = getComputedStyle(this.posterTemplateContainer);

            const parent = this.posterTemplateContainer.parentElement;
            const parentStyle = getComputedStyle(parent);

            let parentWidth = parent.clientWidth;
            parentWidth -= (parseFloat(ownStyle.paddingLeft) + parseFloat(ownStyle.paddingRight));
            parentWidth -= (parseFloat(ownStyle.marginLeft) + parseFloat(ownStyle.marginRight));
            parentWidth -= (parseFloat(parentStyle.paddingLeft) + parseFloat(parentStyle.paddingRight));
            parentWidth -= (parseFloat(parentStyle.marginLeft) + parseFloat(parentStyle.marginRight));

            let maxScale = parentWidth / templateWidth;

            // the scale should never allow for the poster to be
            // larger than the container it resides in
            maxScale = (maxScale > 1) ? 1 : maxScale;

            posterStyle['transform'] = 'scale(' + maxScale + ')';
            posterStyle['transformOrigin'] = 'left top';

            containerStyle.width = templateWidth * maxScale;
            containerStyle.minWidth = templateWidth * maxScale;
            containerStyle.height = containerStyle.width * aspectRatio;
            containerStyle.minHeight = containerStyle.minWidth * aspectRatio;

            maxScale = (maxScale > 1) ? 1 : maxScale;

            if(window.innerWidth >= 992)
                containerStyle.marginLeft = (parentWidth - (templateWidth * maxScale)) / 2.0;
        }

        let src = item.uploadSettings[activeFrame];

        if (files.length) {
            let upload = null;
            const uploadFile = files.filter(uploadedFile => uploadedFile.frame === activeFrame);
            if (uploadFile.length) {
                upload = uploadFile[0];
            }
            if (upload) {
                src = {...src, ...upload};
            }
        }

        return (
            <div style={containerStyle}
                 ref={ node => this.posterTemplateContainer = node } >
                <div id="poster-template"
                     className="poster-template"
                     style={posterStyle} >
                    { frames
                        ? <div className="poster-template__backdrop">{frames}</div>
                        : ''
                    }
                    { textFrames
                        ? <div className="poster-template__text">{textFrames}</div>
                        : ''
                    }
                    <ImageResWarning frame={showFrameWarning}
                                     handleToggleResWarning={handleToggleResWarning} />
                    <ImageSourceSelectModal
                        uploadSettings={item}
                        isOpen={showImageSelect}
                        toggleModal={handleOpenImageSelect}
                        handleFacebookUpload={handleFacebookUpload}
                        handleInstagramUpload={handleInstagramUpload}
                        handleFinishUpload={handleFinishUpload}
                        handleFinishSocialDownload={handleFinishSocialDownload}
                        src={src}
                        frame={activeFrame} />
                </div>
            </div>
        );
    }
}

PosterTemplate.propTypes = {
    item: PropTypes.object,
    files: PropTypes.array,
    text: PropTypes.array,
    handleFinishUpload: PropTypes.func,
    handleFinishSocialDownload: PropTypes.func,
    handleFacebookUpload: PropTypes.func,
    handleInstagramUpload: PropTypes.func,
    handleDroppedFile: PropTypes.func,
    handleFileChange: PropTypes.func,
    handleOpenImageSelect: PropTypes.func,
    handleShowImageToolbar: PropTypes.func,
    showImageToolbar: PropTypes.number,
    showImageSelect: PropTypes.bool,
    handleShowResWarning: PropTypes.func,
    handleToggleResWarning: PropTypes.func,
    handleRemoveResWarning: PropTypes.func,
    frameWarnings: PropTypes.array,
    handleTextChange: PropTypes.func,
    showFrameWarning: PropTypes.number,
    activeFrame: PropTypes.number
};

export default PosterTemplate;
