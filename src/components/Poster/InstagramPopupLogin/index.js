import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container } from 'reactstrap';
import * as actions from '../../../actions/posterActions';
import * as instagramActions from '../../../actions/instagramActions';

class InstagramPopupLogin extends Component {

  render() {

    const popupOptions = {
      width: 700,
      height: 500,
      left: (window.screen.width - 700) / 2,
      top: (window.screen.height - 500) / 2,
    };

    const { clientId, redirectUri } = this.props;

    const popup = window.open(
        'https://api.instagram.com/oauth/authorize/?client_id=' + clientId + '&redirect_uri=' + redirectUri + '&scope=basic&response_type=token',
        '',
        'width=' + popupOptions.width + ',height=' + popupOptions.height + ',left=' + popupOptions.left + ',top=' + popupOptions.top
    );

    const handleAccessToken = (token) => {
      this.props.instagramActions.setInstagramAccessToken(token);
    };

    const interval = setInterval(() => {
      try {
        // Does the popup hash exist?
        if (popup.location.hash.length) {
          // Slice the token out of the URL.  Eww.
          const access_token = popup.location.hash.slice(14);
          // Don't continue checking...
          clearInterval(interval);
          // Clear the popup.
          popup.close();
          // Save to state.
          handleAccessToken(access_token);
        }
      }
      catch (e) {
        // Access denied, should throw error.
      }
    }, 100);

    return (
        <Container>
          <h1>Waiting to authenticate with Instagram. Please check for popups.</h1>
        </Container>
    );
  }

}

InstagramPopupLogin.propTypes = {
  actions: PropTypes.object,
  instagramActions: PropTypes.object,
  instagram: PropTypes.object,
  handleUpload: PropTypes.func,
  uploadSettings: PropTypes.object,
  clientId: PropTypes.string.isRequired,
  redirectUri: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    instagram: state.instagram,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
    instagramActions: bindActionCreators(instagramActions, dispatch),
  };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InstagramPopupLogin);
