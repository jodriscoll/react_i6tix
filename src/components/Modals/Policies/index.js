import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';
import Icon from '../../Common/Icon';

class PoliciesModal extends Component {
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
            <span>
                <span className="link" onClick={this.modalToggle}>{this.props.name}</span>
                <Modal isOpen={this.state.modal}
                    toggle={this.modalToggle}
                    external={closeModal}
                    className="modal__refund-policies">
                    <ModalHeader>{this.props.name}</ModalHeader>
                    <ModalBody>
                        <iframe src={this.props.iframeSrc} width="100%" frameBorder="0" />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="brand" onClick={this.modalToggle}>
                            <span>DONE</span>
                        </Button>
                    </ModalFooter>
                </Modal>
            </span>
        );
    }
}

PoliciesModal.propTypes = {
    name: PropTypes.string,
    iframeSrc: PropTypes.string,
};

export default PoliciesModal;
