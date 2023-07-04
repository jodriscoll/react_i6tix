import {
    SET_STEP,
    SELECT_POSTER,
    EDIT_POSTER,
    SELECT_TEMPLATE,
    SELECT_FILE_SOURCE,
    SET_ACTIVE_FRAME,
    START_UPLOAD,
    FINISH_UPLOAD,
    UPLOAD_ERROR,
    FILE_CHANGE,
    SELECT_PHOTOS,
    REMOVE_PHOTO,
    SHOW_IMAGE_TOOLBAR,
    ADD_FRAME_WARNING,
    TOGGLE_FRAME_WARNING,
    REMOVE_FRAME_WARNING,
    SAVE_TEXT,
    CONFIRM_PERMISSION,
    GENERATE_PREVIEW,
    GENERATE_THUMBNAIL,
    INSTAGRAM_MODAL,
} from '../constants/actionTypes';
import config from '../../storefront/config.js';
import { STEP_CUSTOMIZE_TEMPLATE } from '../constants/posterPersonalization';

const initialState = {
    poster: {
        step: 1,
        posterId: null,
        itemId: 0,
        posterData: null,
        templateId: 0,
        i6TemplateId: 0,
        selectingFileSource: false,
        activeFrame: -1,
        uploadingFiles: false,
        uploadError: false,
        errorMessage: '',
        uploadedFiles: [],
        selectedPhotos: [],
        text: [],
        permission: false,
        preview: null,
        thumbnails: [],
        showImageToolbar: null,
        frameWarnings: [],
        showFrameWarning: null,
        instagramModal: false,
    },
};

export default function posterPersonalizationReducer( state = initialState.poster, action) {

    switch (action.type) {
        case SET_STEP:
            return ({ ...state, step: action.step });

        case SELECT_POSTER:
            
            return ({
                ...state,
                posterId: action.posterId,
                selectedPosterId: action.posterId,
                posterData: config.posters[action.posterId],
                itemId: config.posters[action.posterId].item_id,
                i6TemplateId: config.posters[action.posterId].templates[0].i6_id
            });

        case SELECT_TEMPLATE:
            return ({
                ...state,
                templateId: action.templateId,
                selectedPosterId: action.selectedPosterId,
                i6TemplateId: config.posters[action.selectedPosterId].templates[action.templateId].i6_id
            });

        case SELECT_FILE_SOURCE:
            return ({ ...state, selectingFileSource: action.selectingFileSource });

        case SET_ACTIVE_FRAME:
            return ({ ...state, activeFrame: action.frame });

        case START_UPLOAD:
            return ({ ...state, uploadingFiles: true, uploadError: false, selectingFileSource: false });

        case FINISH_UPLOAD:
            return ({ ...state, uploadingFiles: false, uploadError: false });

        case UPLOAD_ERROR:
            return ({ ...state, uploadingFiles: false, uploadError: true, errorMessage: action.errorMessage });

        case FILE_CHANGE:
            return ({ ...state, uploadedFiles: state.uploadedFiles.filter(file => action.file.id !== file.id).concat([action.file]) });

        case REMOVE_PHOTO:
            return ({ ...state, selectedPhotos: action.selectedPhotos });

        case SELECT_PHOTOS:
            return ({ ...state, selectedPhotos: action.selectedPhotos });

        case SHOW_IMAGE_TOOLBAR:
            return ({ ...state, showImageToolbar: action.frame });

        case ADD_FRAME_WARNING:
            return ({
                ...state,
                frameWarnings: [
                    ...state.frameWarnings,
                    {  id: action.id, show: true },
                ]
            });

        case TOGGLE_FRAME_WARNING:
            return ({ ...state, showFrameWarning: action.id });

        case REMOVE_FRAME_WARNING:
            return ({
                ...state,
                frameWarnings: [
                    ...state.frameWarnings.filter(frame => action.id !== frame.id)
                ]
            });

        case SAVE_TEXT:
            return ({ ...state, text: state.text.filter(t => action.text.frame !== t.frame).concat([action.text]) });

        case CONFIRM_PERMISSION:
            return ({ ...state, permission: action.permission });

        case INSTAGRAM_MODAL:
            return ({ ...state, instagramModal: action.toggle });

        case GENERATE_PREVIEW:
            return ({ ...state, preview: action.preview });

        case GENERATE_THUMBNAIL:
            return ({
                ...state,
                thumbnails: [
                    ...state.thumbnails.filter(thumb => thumb.id != action.thumbnails.id),
                    action.thumbnails,
                ]
            });

        case EDIT_POSTER:
            return ({ ...state, ...action.poster, step: STEP_CUSTOMIZE_TEMPLATE, permission: false });

        default:
            return state;
    }
}
