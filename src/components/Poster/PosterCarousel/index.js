import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import { Button } from 'reactstrap';
import Logo from '../../Common/Logo';
import Icon from '../../Common/Icon';
import strings from '../../../constants/strings.js';
import config from '../../../../storefront/config';

class PosterCarousel extends Component {

    render() {
        const { posters, logo } = config;
        const { selectPoster } = this.props;
        const settings = {
            className: "center",
            centerMode: true,
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            speed: 200,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: true
                    }
                },
                {
                    breakpoint: 1130,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        infinite: true
                    }
                },
            ]
        };

        const slides = posters.map((item) => {
            const slide = { ...item, key: item.id, src: item.image };

            return (
                <div className="slide" key={slide.key}>
                    <div className="poster poster--slide">
                        <div className="poster--slide__content">
                            <img className="poster--slide__image" src={slide.image} alt={slide.title} />
                            <div className="poster--slide__select">
                                <Button color="brand" onClick={() => {
                                    selectPoster(item.id);
                                }}>
                                    <FormattedMessage {...strings.selectPosterButton} />
                                    <Icon id="arrow-right" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });

        return (
            <div className="poster-carousel">
                <Logo size="default" source={logo} />
                <Slider {...settings}>
                    {slides}
                </Slider>
            </div>
        );
    }
}

PosterCarousel.propTypes = {
    selectPoster: PropTypes.func,
    posterId: PropTypes.number,
};

export default PosterCarousel;
