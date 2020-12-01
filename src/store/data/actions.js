import {
    SET_COLOR_SCHEME,
} from './actionTypes.js';

export const setColorScheme = (inputData) => ({
    type: SET_COLOR_SCHEME,
    payload: {
        data: inputData,
    },
});
