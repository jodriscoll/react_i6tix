import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import config from '../../../../storefront/config';

const Footer = () => {
    const { partnersLeft = '', partnersRight = '' } = config;

    return (
        <footer className="partner-logos">
            <Container fluid className="d-flex flex-xs-row justify-content-between">
                <section className="site-footer--first py-3 px-2">
                    <img src={partnersLeft} className="logo--my-memories-poster" />
                </section>
                <section className="site-footer--second py-3 px-2">
                    <img src={partnersRight} className="logo--my-memories-poster" />
                </section>
            </Container>
        </footer>
    );
};

Footer.propTypes = {
    small: PropTypes.bool,
};


export default Footer;
