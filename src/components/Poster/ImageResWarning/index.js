import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import Icon from '../../Common/Icon';
import strings from '../../../constants/strings.js';

const ImageResWarning = ({ frame = null, handleToggleResWarning }) => {

    let popover = null;

    if (typeof frame === 'number') {
        popover = (
            <Popover isOpen={typeof frame === 'number'}
                     toggle={() => handleToggleResWarning()}
                     target={`poster-frame-warning-indicator-${frame}`}
                     placement="bottom"
                     className="poster-res-warning poster-res-warning--image"
                     data-html2canvas-ignore >
                <PopoverHeader>
                    <FormattedMessage {...strings.imageResWarningHeader} />
                </PopoverHeader>
                <PopoverBody>
                    <p><FormattedMessage {...strings.imageResWarningText} /></p>
                    <Button onClick={() => handleToggleResWarning()}>
                        <Icon id="check" />
                        <FormattedMessage {...strings.okayButton} />
                    </Button>
                </PopoverBody>
            </Popover>
        );
    }

    return popover;
};

ImageResWarning.propTypes = {
    show: PropTypes.bool,
    frame: PropTypes.number,
    handleToggleResWarning: PropTypes.func,
};


export default ImageResWarning;
