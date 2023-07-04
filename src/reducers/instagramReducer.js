import {
  INSTAGRAM_DATA_SUCCESS,
  INSTAGRAM_LOGIN_ERROR,
  INSTAGRAM_LOGIN_SUCCESS,
  INSTAGRAM_MODAL,
  FILE_CHANGE,
  INSTAGRAM_PHOTO_SELECTION,
  INSTAGRAM_PHOTO_REMOVAL,
  INSTAGRAM_PHOTO_REMOVALS,
} from '../constants/actionTypes';

const initialState = {
    instagram: {
        userAuthToken: "",
        instagramModal: false,
        photos: null,
        selectedPhotos: [],
    },
};

export default function instagramReducer( state = initialState.instagram, action) {
    switch (action.type) {

        case INSTAGRAM_MODAL:
            return ({ ...state, instagramModal: action.toggle });

        case INSTAGRAM_LOGIN_SUCCESS:
            return ({ ...state, userAuthToken: action.token });

        case INSTAGRAM_LOGIN_ERROR:
            return ({ ...state, userAuthToken: "" });

        case INSTAGRAM_PHOTO_SELECTION:
            return ({
                ...state,
                selectedPhotos: [
                    ...state.selectedPhotos,
                    {
                        ...action.photo,
                        source: action.photo.images.standard_resolution.url,
                    },
                ]
            });

        case INSTAGRAM_PHOTO_REMOVAL:
            return ({
                ...state,
                selectedPhotos: [
                    ...state.selectedPhotos.filter(photo => action.id !== photo.id)
                ]
            });

        case INSTAGRAM_PHOTO_REMOVALS:
            return ({
                ...state,
                selectedPhotos: []
            });

        case INSTAGRAM_DATA_SUCCESS:
            return ({
                ...state,
                photos: action.data,
            });

        case FILE_CHANGE:
            return ({
                ...state,
                instagramModal: false,
                selectedPhotos: [],
            });

        default:
            return state;
    }
}
