import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import * as utilityActions from '../../../actions/utilityActions';
import * as posterActions from '../../../actions/posterActions';
import * as cartActions from '../../../actions/cartActions';
import strings from '../../../constants/strings';
import Icon from '../../Common/Icon';
import { Button } from 'reactstrap';
import Currency from 'react-currency-formatter';
import { FormattedMessage } from 'react-intl';
import { STEP_SHIPPING_ADDRESS } from '../../../constants/checkoutSteps';

class CartItemReview extends Component {

    handleEditPoster = () => {
        this.props.dispatch(push('/cart'));
        this.props.cartActions.setStep(STEP_SHIPPING_ADDRESS);
    };

    render() {
        const {posterData, templateId, preview, quantity} = this.props.item;
        return (
            <section className="cart-item">
                <div className="cart-item--poster">
                    <img src={preview} width="140" height="180" alt="poster image"/>
                </div>
                <div className="cart-item--details">
                    <h5>{posterData.title}</h5>
                    <div className="cart-item--specifications">
                        <span className="size">{posterData.templates[templateId].printDimensions}</span>
                        <span className="price">
                            {quantity} @ <Currency quantity={posterData.templates[templateId].price}/>
                        </span>
                    </div>
                    <Button
                        className="btn-edit"
                        onClick={this.handleEditPoster} >
                        <Icon id="edit"/>
                        <FormattedMessage {...strings.editButton} />
                    </Button>
                </div>
            </section>
        )
    }
}

CartItemReview.propTypes = {
    item: PropTypes.object,
    utilityActions: PropTypes.object,
    utilities: PropTypes.object,
    posterActions: PropTypes.object,
    cartActions: PropTypes.object,
    dispatch: PropTypes.func,
};


function mapStateToProps(state) {
    return {
        utilities: state.utilities,
    };
}

function mapDispatchToProps(dispatch) {
    const dispatchActions = {
        utilityActions: bindActionCreators(utilityActions, dispatch),
        posterActions: bindActionCreators(posterActions, dispatch),
        cartActions: bindActionCreators(cartActions, dispatch),
    };
    return { ...dispatchActions, dispatch}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CartItemReview);
