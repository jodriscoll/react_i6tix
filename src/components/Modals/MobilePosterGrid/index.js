import React, { Component } from 'react';
import { Button, Modal, ModalBody } from 'reactstrap';
import PropTypes from 'prop-types';

class MobilePosterGrid extends Component {
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
        const closeModal = <i className="ico ico-close grid-view"
                              aria-hidden="true"
                              onClick={this.modalToggle} />;

        return (
            <div className="mobile-poster-grid">
                <Button className="btn-grid-view"
                        onClick={this.modalToggle} />
                <Modal  isOpen={this.state.modal}
                        toggle={this.modalToggle}
                        external={closeModal}
                        className="modal__mobile-poster-grid">
                    <ModalBody>
                        <div className="poster-personalization__step edit-poster">
                            { React.cloneElement(this.props.children, {
                                modalToggle: this.modalToggle
                            })}
                        </div>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

MobilePosterGrid.propTypes = {
    iframeSrc: PropTypes.string,
    children: PropTypes.element.isRequired,
};

export default MobilePosterGrid;
