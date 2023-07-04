import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import Logo from '../Common/Logo';
import Icon from '../Common/Icon';
import config from '../../../storefront/config';

const NotFoundPage = () => {
    const { logo = '' } = config;

    return (
        <section className="not-found">
            <Container>
                <Row>
                    <Logo size="default" source={logo} />
                </Row>
                <Row>
                    <Col xs="12">
                        <div className="not-found__content">
                            <h1>Ooops!</h1>
                            <p>It looks like you might have a broken link. Not to worry, we can get you back to where you want to be!</p>
                            <Link to="/" target="_self" className="btn btn-brand">
                                <span>Create a Design!</span>
                                <Icon id="arrow-right" />
                            </Link>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default NotFoundPage;
