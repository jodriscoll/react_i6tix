import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Row, Col } from 'reactstrap';
import Logo from '../Common/Logo';
import { FormattedMessage } from 'react-intl';
import Icon from '../Common/Icon';
import strings from '../../constants/strings.js';
import PosterSelectionLink from '../Common/PosterSelectionLink';
import * as actions from '../../actions/cartActions';
import config from '../../../storefront/config';
import ReactGA from 'react-ga';

class ConfirmationPage extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        window.scrollTo(0, 0);
    }

    gaEvent(label) {
        ReactGA.event({
            category: 'Order confirmation',
            action: 'Sharing buttons',
            label: label
        });
    }

    renderPoster(poster, index) {
        const shareUrl = this.props.order.shareUrl[index];

        return (
            <div className="poster-previews__poster" key={index}>
                <img key={poster.id} src={poster.preview} width="232" height="357" />
                <div className="share-buttons">
                    <a href={shareUrl}
                          target="_blank"
                          download="my-poster.png"
                          className="btn btn-secondary"
                          onClick={() => {
                              this.gaEvent('Instagram');
                          }}>
                        <Icon id="instagram" />
                        <FormattedMessage {...strings.shareInstagram} />
                    </a>
                    <a href={"https://www.facebook.com/sharer/sharer.php?u=" + shareUrl}
                          target="_blank"
                          className="btn btn-secondary"
                          onClick={() => {
                              this.gaEvent('Facebook');
                          }}>
                        <Icon id="facebook" />
                        <FormattedMessage {...strings.shareFacebook} />
                    </a>
                    <a href={"https://twitter.com/intent/tweet?text=Check+out+this+great+poster&url=" + shareUrl}
                        target="_blank"
                        className="btn btn-secondary"
                        onClick={() => {
                            this.gaEvent('Twitter');
                        }}>
                        <Icon id="twitter" />
                        <FormattedMessage {...strings.shareTwitter} />
                    </a>
                </div>
            </div>
        );
    }

    render() {
        // Since IDs only exist in the PE and not the API, there is an assumption that the order of items is the same.
        const { logoCheckout } = config;

        const pluralize = this.props.order.items.length > 1 ? 's' : '';

        return (
            <section className="order-confirmation">
                <Container>
                    <Row>
                        <Logo size="default" source={logoCheckout} />
                    </Row>
                    <Row>
                        <Col xs="12">
                            <div className="order-confirmation__information">
                                <div className="order-confirmation__details">
                                    <h1>Thanks for your order!</h1>
                                    <span>You will receive your masterpiece{pluralize} in two weeks!</span>
                                    <span className="order-number">
                                        Confirmation #:
                                        <span>{this.props.order.confirmation}</span>
                                    </span>
                                </div>
                                <div className="order-confirmation__start_again">
                                    <PosterSelectionLink className="btn btn-brand">
                                        <FormattedMessage {...strings.orderConfirmationStartAgain} />
                                    </PosterSelectionLink>
                                </div>
                            </div>
                            <div className="order-confirmation__designs">
                                <h2>Your Creation{pluralize}:</h2>
                                <div className="poster-previews">{
                                    this.props.order.items.map((item, index) => { return this.renderPoster(item, index)})
                                }</div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        );
    }
}

ConfirmationPage.propTypes = {
    order: PropTypes.object,
    actions: PropTypes.object,
};

function mapStateToProps(state) {
    return {
        order: state.order,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ConfirmationPage);
