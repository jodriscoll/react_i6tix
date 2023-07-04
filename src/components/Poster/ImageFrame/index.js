import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';
import AvatarEditor from '../../../vendor/react-avatar-editor-i6/src/index.js';
import strings from '../../../constants/strings.js';

class ImageFrame extends Component {

    constructor(props) {
        super(props);
        this.editor = null;

        this.setEditorRef = (editor) => this.editor = editor;
    }

    handlePositionChange = (position) => {
        // Be explicit in our checks so it is clear later.
        if (position.x > 1) {
            position.x = 1;
        }
        else if (position.x < 0) {
            position.x = 0;
        }
        if (position.y > 1) {
            position.y = 1;
        }
        else if (position.y < 0) {
            position.y = 0;
        }
        this.props.handleFilePositionChange(position);
    };

    checkImageRes = () => {
        const { upload, i, file, handleShowResWarning, handleRemoveResWarning, minimumDesiredImageHeight, minimumDesiredImageWidth, dpiRatio } = this.props;

        // Determine whether we have an error or not. Assert the determined state by calling the appropriate handler.
        // Note: Image resolution is only relevant if we have a file and the editor has been instantiated.
        if (upload && file && this.editor) {
            const { imageHeight, imageWidth } = upload; // Note: this is the height/width of the image in the editor, not the frame

            // Apply the cropping rect to determine the effective image size.
            // We use this instead of 'scale' since it correctly handles both zoom-in and zoom-out cases.
            const croppingRect = this.editor.getCroppingRect(); // Note: "all values relative to the image size (that is, comprised between 0 and 1)"
            const effectiveHeight = imageHeight * croppingRect.height;
            const effectiveWidth = imageWidth * croppingRect.width;

            const minHeight = minimumDesiredImageHeight * dpiRatio;
            const minWidth = (minimumDesiredImageWidth * dpiRatio);

            if (effectiveHeight < minHeight || effectiveWidth < minWidth) {
                handleShowResWarning(i);
            }
            else {
                handleRemoveResWarning(i);
            }
        }
    };

    render() {
        const { file, frame, imageWidth, imageHeight, scale, imageRotate, position } = this.props;

        return (
            <div className="poster-frame__container__inner">
                { file
                    ? ''
                    :
                    <span className="poster-frame__placeholder-text" style={{transform: `rotate(${frame.rotate}deg)`}}>
                        <FormattedMessage {...strings.imageFramePlaceholder} />
                    </span>
                }
                <div className="poster-frame__editor" style={{transform: `rotate(${frame.rotate}deg)`}}>
                    <AvatarEditor
                        ref={this.setEditorRef}
                        image={file}
                        width={imageWidth}
                        height={imageHeight}
                        position={position}
                        border={0}
                        color={[255, 255, 255, .6]}
                        scale={scale}
                        rotate={imageRotate}
                        onPositionChange={this.handlePositionChange}
                        onImageChange={() => this.checkImageRes()}
                        onImageReady={() => this.checkImageRes()}
                    />
                </div>
            </div>
        )
    }

}

ImageFrame.propTypes = {
    file: PropTypes.string,
    frame: PropTypes.object,
    imageWidth: PropTypes.number,
    imageHeight: PropTypes.number,
    scale: PropTypes.number,
    position: PropTypes.object,
    imageRotate: PropTypes.number,
    upload: PropTypes.object,
    i: PropTypes.number,
    handleShowResWarning: PropTypes.func,
    handleRemoveResWarning: PropTypes.func,
    handleFilePositionChange: PropTypes.func,
    minimumDesiredImageWidth: PropTypes.number,
    minimumDesiredImageHeight: PropTypes.number,
    dpiRatio: PropTypes.number,
};

export default ImageFrame;
