import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import Icon from '../../Common/Icon';

class TermsConditionsModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };
        this.modalToggle = this.modalToggle.bind(this);
    }
    modalToggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        const closeModal = <Icon id="close" onClick={this.modalToggle} />;

        return (
            <Row>
                <p>By continuing, you agree to the <br /> <span className="link" onClick={this.modalToggle}>Terms & Conditions</span></p>
                <Modal isOpen={this.state.modal}
                    toggle={this.modalToggle}
                    external={closeModal}
                    className="modal__terms-conditions">
                    <ModalHeader>Terms & Conditions</ModalHeader>
                    <ModalBody>
                        <iframe src={this.props.iframeSrc} width="100%" frameBorder="0" />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="brand" onClick={this.modalToggle}>
                            <span>DONE</span>
                        </Button>
                    </ModalFooter>
                </Modal>
            </Row>
        );
    }
}

TermsConditionsModal.propTypes = {
    iframeSrc: PropTypes.string,
};

export default TermsConditionsModal;
