import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import Icon from '../../Common/Icon';
import strings from '../../../constants/strings.js';

const CartLink = ({ items = [] }) => {

    return (
        <div className="cart">
            <NavLink to="/cart">
                <Icon id="cart" />
                <span className="cart__text"><FormattedMessage {...strings.cart} /></span>
                <span className="cart__quantity">({items.length})</span>
            </NavLink>
        </div>
    );
};

CartLink.propTypes = {
    items: PropTypes.array,
};


export default CartLink;
