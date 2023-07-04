import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { Container, Row, Col } from 'reactstrap';
import Logo from '../../Common/Logo';
import strings from '../../../constants/strings.js';
import config from '../../../../storefront/config';
import ReactGA from 'react-ga';

const PosterGrid = ({ posterData = null, posterId = 0, handleClick, modalToggle }) => {

    function gaEvent(posterTitle) {
        ReactGA.event({
            category: 'Poster Editor',
            action: 'Switched between available posters',
            label: posterTitle
        });
    }

    let displayedPosters  = [];
    const { posters, logoSm } = config;

    if (posterData) {
        posters.forEach((poster) => {
            displayedPosters = displayedPosters.concat(poster.templates.map((item, templateId) => {
                const { id, title, printDimensions, thumbnail } = item;
                const gridPosterId = poster.id.toString();
                const selected = posterId === gridPosterId;

                return (
                    <Col xs="4"
                         lg="4"
                         className="poster-grid__item"
                         key={`${poster.id}-${id}`}
                         onClick={() => {
                             gaEvent(poster.title);
                             handleClick(gridPosterId, templateId);
                             // check if modalToggle was passed to this component
                             // i.e. if the PosterGrid was cloned via MobilePosterGrid
                             if(typeof modalToggle === 'function')
                                 modalToggle();
                         }}>
                        <article className={ classnames('poster-template', 'selection-frame', [ { 'poster-template--selected': selected, 'selection-frame--selected': selected } ]) }>
                            <div className="poster-template__image selection-content">
                                <div className="poster-thumbnail">
                                    <img className="poster-thumbnail-image"
                                         src={thumbnail} />
                                </div>
                                { selected
                                    ? <span className="selected-label poster-template__selected-label">Selected</span>
                                    : ''
                                }
                            </div>
                            <h2 className="poster-template__title">{title}</h2>
                            <span className="poster-template__dimensions">{printDimensions}</span>
                        </article>
                    </Col>
                );
            }));
        });
    }

    return (
        <section className="poster-grid">
            <Container>
                <Logo size="small" source={logoSm} />
                <h1 className="poster-grid__title">
                    <FormattedMessage {...strings.posterGridTitle} />
                </h1>
                <Row className="poster-grid__list">
                    { posterData
                        ? displayedPosters
                        : ''
                    }
                </Row>
            </Container>
        </section>
    );
};

PosterGrid.propTypes = {
    posterData: PropTypes.object,
    otherPosters: PropTypes.object,
    templateId: PropTypes.number,
    posterId: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]),
    handleClick: PropTypes.func,
    handleGenerateThumbnail: PropTypes.func,
    thumbnail: PropTypes.object,
    modalToggle: PropTypes.func
};

export default PosterGrid;
