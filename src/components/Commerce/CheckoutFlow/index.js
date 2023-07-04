import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../actions/cartActions';
import * as alertActions from '../../../actions/alertActions';
import {
    STEP_SHIPPING_ADDRESS,
    STEP_REVIEW,
    STEP_PAYMENT_METHOD,
    STEP_COMPLETE
} from '../../../constants/checkoutSteps.js'
import ShippingForm from '../ShippingForm';
import PaymentForm from '../PaymentForm';
import OrderReview from '../OrderReview';
import ConfirmationPage from '../../ConfirmationPage';
import GlobalAlert from '../../Common/GlobalAlert';
import GlobalLoader from '../../Common/GlobalLoader';
import {push} from "react-router-redux";

class CheckoutFlow extends PureComponent {

    componentWillMount() {
        this.props.actions.setCheckoutLoading(false);
        if (this.props.cart.items.length < 1) {
          this.props.dispatch(push('/cart'));
        }
        window.scrollTo(0, 0);
    }

    handleSetStep = (step) => {
        this.props.actions.setStep(step);
    };

    handleDismissAlert = () => {
        this.props.alertActions.dismissAlert();
    };

    checkoutStep = () => {

        const {
            step = 1,
        } = this.props.cart;

        switch (step) {

            case STEP_COMPLETE:
                return (
                    <ConfirmationPage/>
                );

            case STEP_REVIEW:
                return (
                    <OrderReview handleSetStep={this.handleSetStep} />
                );

            case STEP_PAYMENT_METHOD:
                return (
                    <PaymentForm handleSetStep={this.handleSetStep} />
                );

            case STEP_SHIPPING_ADDRESS:
            default:
                return (
                    <ShippingForm handleSetStep={this.handleSetStep} />
                );
        }
    };

    render() {
        const checkoutStep = this.checkoutStep();
        const { alert } = this.props;
        return (
            <section className="poster-checkout">
                <GlobalAlert alert={alert} handleDismissAlert={this.handleDismissAlert} />
                {  (this.props.cart.loading)
                     ? <GlobalLoader />
                     : checkoutStep
                }
            </section>
        );
    }

}

CheckoutFlow.propTypes = {
    step: PropTypes.number,
    posterId: PropTypes.number,
    posterData: PropTypes.object,
    templateId: PropTypes.number,
    selectingFileSource: PropTypes.bool,
    uploadingFiles: PropTypes.bool,
    uploadError: PropTypes.bool,
    errorMessage: PropTypes.string,
    uploadedFiles: PropTypes.array,
    text: PropTypes.string,
    showImageToolbar: PropTypes.number,
    preview: PropTypes.string,
    permission: PropTypes.bool,
    handleSelectPoster: PropTypes.func,
    handleSelectTemplate: PropTypes.func,
    handleFinishUpload: PropTypes.func,
    handleFileChange: PropTypes.func,
    handleConfirmPermission: PropTypes.func,
    handleOpenImageSelect: PropTypes.func,
    handleAddPosterToCart: PropTypes.func,
    handleGenerateThumbnail: PropTypes.func,
    handleGeneratePreview: PropTypes.func,
    handleShowImageToolbar: PropTypes.func,
    cart: PropTypes.object,
    actions: PropTypes.object,
    alertActions: PropTypes.object,
    alert: PropTypes.object,
    dispatch: PropTypes.func,
};

function mapStateToProps(state) {
    return {
        cart: state.cart,
        alert: state.alert,
    };
}

function mapDispatchToProps(dispatch) {
    const dispatchActions = {
        actions: bindActionCreators(actions, dispatch),
        alertActions: bindActionCreators(alertActions, dispatch),
    };
    return { ...dispatchActions, dispatch}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CheckoutFlow);
