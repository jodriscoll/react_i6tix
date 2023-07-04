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
    ADD_TO_CART,
    UPDATE_CART,
} from '../constants/actionTypes';

export const setStep = (step) => ({
    type: SET_STEP,
    step,
});

export const selectPoster = (posterId) => ({
    type: SELECT_POSTER,
    posterId,
});

export const editPoster = (poster) => ({
    type: EDIT_POSTER,
    poster,
});

export const selectTemplate = (selectedPosterId, templateId) => ({
    type: SELECT_TEMPLATE,
    selectedPosterId,
    templateId,
});

export const selectFileSource = (selectingFileSource) => ({
    type: SELECT_FILE_SOURCE,
    selectingFileSource,
});

export const setActiveFrame = (frame) => ({
    type: SET_ACTIVE_FRAME,
    frame,
});

export const startUpload = () => ({
    type: START_UPLOAD,
});

export const finishUpload = () => ({
    type: FINISH_UPLOAD
});

export const changeFile = (file) => ({
    type: FILE_CHANGE,
    file,
});

export const uploadError = (errorMessage) => ({
    type: UPLOAD_ERROR,
    errorMessage,
});

export const selectPhotos = (selectedPhotos) => ({
    type: SELECT_PHOTOS,
    selectedPhotos,
});

export const removePhoto = (selectedPhotos) => ({
    type: REMOVE_PHOTO,
    selectedPhotos,
});

export const showImageToolbar = (frame) => ({
    type: SHOW_IMAGE_TOOLBAR,
    frame,
});

export const addFrameWarning = (id) => ({
    type: ADD_FRAME_WARNING,
    id,
});

export const toggleFrameWarning = (id) => ({
    type: TOGGLE_FRAME_WARNING,
    id,
});

export const removeFrameWarning = (id) => ({
    type: REMOVE_FRAME_WARNING,
    id,
});

export const saveText = (text) => ({
    type: SAVE_TEXT,
    text,
});

export const generateThumbnails = (thumbnails) => ({
    type: GENERATE_THUMBNAIL,
    thumbnails,
});

export const generatePreview = (preview) => ({
    type: GENERATE_PREVIEW,
    preview,
});

export const confirmPermission = (permission) => ({
    type: CONFIRM_PERMISSION,
    permission,
});

export const addToCart = (item) => ({
    type: ADD_TO_CART,
    item,
});

export const updateCart = (item) => ({
    type: UPDATE_CART,
    item,
});
