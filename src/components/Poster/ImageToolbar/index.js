import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Button, Popover, PopoverBody } from 'reactstrap';
import Icon from '../../Common/Icon';
import strings from '../../../constants/strings.js';
import ReactGA from 'react-ga';
import Hammer from 'react-hammerjs';

class ImageToolbar extends Component {

    gaEvent(label) {
        ReactGA.event({
            category: 'Poster Editor',
            action: 'Clicked toolbar button',
            label: label
        });
    }

    preventDoubleTap(e) {
        if (e && e.tapCount % 2 == 0) {
            e.preventDefault();
            e.target.click();
        }
    }

    render() {
        const {
            handleFileChange,
            modalToggle,
            src,
            imageRotate,
            scale,
            frame,
            show,
            toggle
        } = this.props;

        const hammerConfig = {
            recognizers: {
                doubletap: { enable: true }
            }
        };

        return (
            <div className="image-toolbar">
                <Popover isOpen={show}
                         target={`poster-frame-${frame}`}
                         placement="bottom"
                         className="poster-toolbar poster-toolbar--image"
                         toggle={() => toggle(null)} >
                    <Hammer options={hammerConfig} onTap={this.preventDoubleTap}>
                        <div>
                            <PopoverBody>
                                <Button className="toolbar-btn rotate-left" onClick={() => {
                                    this.gaEvent('Rotate Left');
                                    handleFileChange({...src, imageRotate: imageRotate - 10});
                                }}>
                                    <Icon id="rotate-left"/>
                                    <FormattedMessage {...strings.imageToolbarRotateLeft} />
                                </Button>
                                <Button className="toolbar-btn rotate-right" onClick={() => {
                                    this.gaEvent('Rotate Right');
                                    handleFileChange({...src, imageRotate: imageRotate + 10});
                                }}>
                                    <Icon id="rotate-right"/>
                                    <FormattedMessage {...strings.imageToolbarRotateRight} />
                                </Button>
                                <Button className="toolbar-btn zoom-out" onClick={() => {
                                    this.gaEvent('Zoom Out');
                                    handleFileChange({...src, scale: Math.max(scale - 0.1, 0.3) });
                                }}>
                                    <Icon id="zoom-out"/>
                                    <FormattedMessage {...strings.imageToolbarZoomOut} />
                                </Button>
                                <Button className="toolbar-btn zoom-in" onClick={() => {
                                    this.gaEvent('Zoom In');
                                    handleFileChange({...src, scale: Math.min(scale + 0.1, 2.5) });
                                }}>
                                    <Icon id="zoom-in"/>
                                    <FormattedMessage {...strings.imageToolbarZoomIn} />
                                </Button>
                                <Button className="toolbar-btn photo-upload" onClick={() => {
                                    this.gaEvent('Photo Upload');
                                    modalToggle(frame);
                                }}>
                                    <Icon id="camera"/>
                                    <FormattedMessage {...strings.imageToolbarSelectImage} />
                                </Button>
                            </PopoverBody>
                        </div>
                    </Hammer>
                </Popover>
            </div>
        );
    }
}

ImageToolbar.propTypes = {
    handleFinishUpload: PropTypes.func,
    handleFinishSocialDownload: PropTypes.func,
    handleFacebookUpload: PropTypes.func,
    handleInstagramUpload: PropTypes.func,
    handleFileChange: PropTypes.func,
    modalToggle: PropTypes.func,
    src: PropTypes.object,
    uploadSettings: PropTypes.object,
    imageRotate: PropTypes.number,
    rotate: PropTypes.number,
    scale: PropTypes.number,
    frame: PropTypes.number,
    show: PropTypes.bool,
    toggle: PropTypes.func,
};


export default ImageToolbar;
