import {
    FACEBOOK_ALBUM_RETRIEVAL,
    FACEBOOK_ALBUM_SELECTION,
    FACEBOOK_PHOTO_SELECTION,
    FACEBOOK_PHOTO_REMOVAL,
    FACEBOOK_PHOTO_REMOVALS,
    FACEBOOK_DATA_SUCCESS,
    FACEBOOK_LOGIN_ERROR,
    FACEBOOK_LOGIN_SUCCESS,
    FACEBOOK_MODAL,
    FILE_CHANGE
} from '../constants/actionTypes';

const initialState = {
    facebook: {
        userAuthToken: "",
        userLoginError: false,
        userId: "",
        albums: [],
        selectedAlbum: "",
        facebookModal: false,
        selectedPhotos: [],
    },
};

export default function facebookReducer(state = initialState.facebook, action) {
    switch (action.type) {

        case FACEBOOK_MODAL:
            return ({...state, facebookModal: action.toggle, userLoginError: false});

        case FACEBOOK_LOGIN_SUCCESS:
            return ({
                ...state,
                userAuthToken: action.userData.userAuthToken,
                userLoginError: action.userData.userLoginError,
                userId: action.userData.userId
            });

        case FACEBOOK_LOGIN_ERROR:
            return ({
                ...state,
                userAuthToken: action.userData.userAuthToken,
                userLoginError: action.userData.userLoginError,
                userId: action.userData.userId
            });

        case FACEBOOK_ALBUM_RETRIEVAL:
            return ({...state, albums: action.albums});

        case FACEBOOK_ALBUM_SELECTION:
            return ({...state, selectedAlbum: action.album});

        case FACEBOOK_PHOTO_SELECTION:
            return ({
                ...state,
                selectedPhotos: [
                    ...state.selectedPhotos,
                    {  ...action.photo },
                ]
            });

        case FACEBOOK_PHOTO_REMOVAL:
            return ({
                ...state,
                selectedPhotos: [
                    ...state.selectedPhotos.filter(photo => action.id !== photo.id)
                ]
            });

        case FACEBOOK_PHOTO_REMOVALS:
            return ({
                ...state,
                selectedPhotos: [],
            });

        case FACEBOOK_DATA_SUCCESS:
            return ({
                ...state,
                albums: action.data.albums.data,
            });

        case FILE_CHANGE:
            return ({
                ...state,
                facebookModal: false,
                selectedPhotos: false,
            });

        default:
            return state;
    }
}
