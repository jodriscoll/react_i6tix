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
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap';
import Currency from 'react-currency-formatter';
import { FormattedMessage } from 'react-intl';
import ReactGA from 'react-ga';

class CartItem extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false
        };
    }

    gaEvent(action) {
        ReactGA.event({
            category: 'Cart',
            action: action
        });
    }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    handleEditPoster = () => {
        this.gaEvent('Edit existing poster');
        this.props.posterActions.editPoster(this.props.item);
        this.props.dispatch(push('/poster'));
    };

    handleRemovePoster = () => {
        this.gaEvent('Remove existing poster');
        this.props.cartActions.removeFromCart(this.props.item.id);
    };

    handleChangeQuantity = (quantity) => {
        this.gaEvent('Change quantity');
        this.props.cartActions.editCartItem({...this.props.item, quantity});
    };

    render() {
        const {posterData, quantity, templateId, preview} = this.props.item;

        let dropdownItems = [];
        for (let i = 1; i <= 9; i++) {
            dropdownItems[i] = <DropdownItem onClick={() => this.handleChangeQuantity(i)} key={i}>{i}</DropdownItem>;
        }

        return (
            <section className="cart-item">
                <div className="cart-item--poster">
                    <img src={preview} width="140" height="180" alt="poster image"/>
                </div>
                <div className="cart-item--details">
                    <h5>{posterData.title}</h5>
                    <div className="cart-item--specifications">
                        <span className="size">{posterData.templates[templateId].printDimensions}</span>
                        <span className="price"><Currency quantity={posterData.templates[templateId].price}/></span>
                    </div>
                    <div className="cart-item--modifiers">
                        <Button
                            className="btn-edit"
                            onClick={this.handleEditPoster}
                            >
                            <Icon id="edit"/>
                            <FormattedMessage {...strings.editButton} />
                        </Button>
                        <Button
                            className="btn-remove"
                            onClick={this.handleRemovePoster}
                            >
                            <Icon id="remove"/>
                            <FormattedMessage {...strings.removeButton} />
                        </Button>
                        <Dropdown
                            isOpen={this.state.dropdownOpen}
                            toggle={this.toggle}>
                            <DropdownToggle
                                color="red"
                                caret >
                                {quantity}
                            </DropdownToggle>
                            <DropdownMenu>
                                {dropdownItems}
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
            </section>
        )
    }
}

CartItem.propTypes = {
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
)(CartItem);
