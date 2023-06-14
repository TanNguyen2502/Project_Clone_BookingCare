import actionTypes from './actionTypes';

export const changeLanguageApp = (languageInput) => ({
    type: actionTypes.CHANGE_LANGUAGE,
    language: languageInput
})

export const appStartUpComplete = () => ({
    type: actionTypes.APP_START_UP_COMPLETE
});