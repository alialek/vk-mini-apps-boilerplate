import {
    SET_COLOR_SCHEME,
} from './actionTypes';

const initialState = {
    colorScheme: 'client_light',
};

export const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_COLOR_SCHEME: {
            return {
                ...state,
                colorScheme: action.payload.data,
            };
        }
        default: {
            return state;
        }
    }
};
