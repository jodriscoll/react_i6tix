import {
  INSTAGRAM_LOGIN_SUCCESS,
  INSTAGRAM_MODAL,
  INSTAGRAM_DATA_SUCCESS,
  INSTAGRAM_PHOTO_SELECTION,
  INSTAGRAM_PHOTO_REMOVAL,
  INSTAGRAM_PHOTO_REMOVALS,
} from '../constants/actionTypes';

export const toggleInstagramModal = (toggle) => ({
  type: INSTAGRAM_MODAL,
  toggle,
});

export const setInstagramAccessToken = (token) => ({
  type: INSTAGRAM_LOGIN_SUCCESS,
  token,
});

const instagramApiAsync = (accessToken) => {
  return fetch('https://api.instagram.com/v1/users/self/media/recent?access_token=' + accessToken)
      .then((response) => {
          return response.json();
      })
      .catch(() => {
          return { data: [] };
      });
};

export const selectInstagramPhoto = (photo) => ({
  type: INSTAGRAM_PHOTO_SELECTION,
  photo,
});

export const removeInstagramPhoto = (id) => ({
  type: INSTAGRAM_PHOTO_REMOVAL,
  id,
});

export const removeInstagramPhotos = () => ({
  type: INSTAGRAM_PHOTO_REMOVALS,
});

export const loadInstagramDataSuccess = (data) => ({
    type: INSTAGRAM_DATA_SUCCESS,
    data: data.data,
});

export const loadInstagramPhotos = (clientId, accessToken) => {
    return dispatch => {
        return instagramApiAsync(accessToken).then(data => {
            dispatch(loadInstagramDataSuccess(data))
        }).catch(() => {
            dispatch(loadInstagramDataSuccess([]));
        });
    }
};
