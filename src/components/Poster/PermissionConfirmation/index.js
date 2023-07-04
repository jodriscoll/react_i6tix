import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Card, CardBody, CardTitle, Button } from 'reactstrap';
import SetStepButton from '../SetStepButton';
import { STEP_PREVIEW } from '../../../constants/posterPersonalization.js'
import strings from '../../../constants/strings.js';
import ReactGA from 'react-ga';

const PermissionConfirmation = ({ permission = false, handleChange, handleSetStep, handleAddPosterToCart }) => {

    function gaEvent(action) {
        ReactGA.event({
            category: 'Poster Preview',
            action: action
        });
    }

    return (
        <section className="permission-confirmation">
            <Card>
                <CardBody>
                    <CardTitle className="text-center">
                        <FormattedMessage {...strings.confirmationTitle} />
                    </CardTitle>
                    <div className="permission-confirmation__checkbox">
                        <label className="custom-control checkbox">
                            <input
                                type="checkbox"
                                checked={permission}
                                onChange={() => handleChange()}
                                id="permission-confirmation-checkbox"
                                className="custom-control-input"
                            />
                            <span className="checkbox-indicator" />
                            <p className="checkbox-text">
                                <FormattedMessage {...strings.confirmationCheckbox} />
                            </p>
                        </label>
                    </div>
                    <div className="permission-confirmation__buttons">
                        <SetStepButton
                            onClick={() => {
                                gaEvent('Clicked make change button – desktop');
                                handleSetStep(STEP_PREVIEW - 1);
                            }}
                            block
                            color="changes"
                            step={STEP_PREVIEW - 1}
                            text={<FormattedMessage {...strings.makeChangesButton} />} />
                        <SetStepButton
                            className="btn--change-step btn--back"
                            onClick={() => {
                                gaEvent('Clicked make change button – mobile');
                                handleSetStep(STEP_PREVIEW - 1);
                            }}
                            block
                            color="brand"
                            step={STEP_PREVIEW - 1}
                            text="Edit" />
                        <Button
                            block
                            color="brand"
                            disabled={!permission}
                            className="btn--ready-to-buy"
                            onClick={() => {
                            gaEvent('Clicked add to cart button');
                            handleAddPosterToCart();
                        }}>
                            <FormattedMessage {...strings.cartLink} />
                        </Button>
                    </div>
                </CardBody>
            </Card>
        </section>
    );
};

PermissionConfirmation.propTypes = {
    permission: PropTypes.bool,
    handleChange: PropTypes.func,
    handleSetStep: PropTypes.func,
    handleAddPosterToCart: PropTypes.func,
};

export default PermissionConfirmation;
