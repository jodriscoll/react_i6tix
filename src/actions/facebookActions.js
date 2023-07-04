import {
    FACEBOOK_ALBUM_RETRIEVAL,
    FACEBOOK_LOGIN_ERROR,
    FACEBOOK_LOGIN_SUCCESS,
    FACEBOOK_DATA_SUCCESS,
    FACEBOOK_DATA_ERROR,
    FACEBOOK_MODAL,
    FACEBOOK_ALBUM_SELECTION,
    FACEBOOK_PHOTO_SELECTION,
    FACEBOOK_PHOTO_REMOVAL,
    FACEBOOK_PHOTO_REMOVALS,
} from '../constants/actionTypes';
import Promise from 'bluebird';

export const toggleFacebookModal = (toggle) => ({
    type: FACEBOOK_MODAL,
    toggle,
});

export const facebookLoginSuccess = (userData) => ({
    type: FACEBOOK_LOGIN_SUCCESS,
    userData,
});

export const facebookLoginError = (userData) => ({
    type: FACEBOOK_LOGIN_ERROR,
    userData,
});

const facebookApiAsync = new Promise.method(endpoint => {
    return new Promise((resolve, reject) => {
        window.FB.api(endpoint, function(data) {
            if (data.error) {
                reject(data.error);
            }
            resolve(data);
        });
    });
});

export function loadFacebookAlbums() {
    return dispatch => {
        return facebookApiAsync('/me/albums').then(data => {
            dispatch(loadFacebookAlbumsSuccess(data.data));
        }).catch(() => {
            dispatch(loadFacebookAlbumsSuccess([]));
        });
    }
}

export const loadFacebookAlbumsSuccess = (albums) => ({
    type: FACEBOOK_ALBUM_RETRIEVAL,
    albums
});

export const selectFacebookAlbum = (album) => ({
    type: FACEBOOK_ALBUM_SELECTION,
    album,
});

export const selectFacebookPhoto = (photo) => ({
    type: FACEBOOK_PHOTO_SELECTION,
    photo,
});

export const removeFacebookPhoto = (id) => ({
    type: FACEBOOK_PHOTO_REMOVAL,
    id,
});

export const removeFacebookPhotos = () => ({
    type: FACEBOOK_PHOTO_REMOVALS,
});

export const loadFacebookDataSuccess = (data) => ({
    type: FACEBOOK_DATA_SUCCESS,
    data,
});

export const loadFacebookDataError = (data) => ({
    type: FACEBOOK_DATA_ERROR,
    data,
});

export const loadFacebookData = () => {
    return dispatch => {
        return facebookApiAsync('/me?fields=albums.fields(id,name,cover_photo.fields(name,picture,source),photos.fields(name,picture,source))&limit=500').then(data => {
            dispatch(loadFacebookDataSuccess(data));
        }).catch(() => {
            dispatch(loadFacebookDataError());
        })
    }
};
