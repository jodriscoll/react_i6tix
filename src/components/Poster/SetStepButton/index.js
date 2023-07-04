import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

const SetStepButton = ({ text, step, icon, handleClick, ...btnProps }) => {
    return (
        <Button onClick={() => handleClick(step)} {...btnProps}>
            {icon}
            <span>{text}</span>
        </Button>
    );
};

SetStepButton.propTypes = {
    text: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    icon: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    step: PropTypes.number,
    handleClick: PropTypes.func,
};


export default SetStepButton;
