import {
  SET_COLOR_SCHEME,
  SET_SNACKBAR,
  SET_IS_ONBOARDING_VIEWED,
} from "./actionTypes.js";
import {
  SET_ACTIVE_QUIZ,
  SET_NOTIFICATIONS,
  SET_PROFILE,
  SET_ACTIVE_ANSWER
} from "./actionTypes";

export const setColorScheme = (inputData) => ({
  type: SET_COLOR_SCHEME,
  payload: {
    data: inputData,
  },
});
export const setSnackbar = (inputData) => ({
  type: SET_SNACKBAR,
  payload: {
    data: inputData,
  },
});
export const setIsOnboardingViewed = (inputData) => ({
  type: SET_IS_ONBOARDING_VIEWED,
  payload: {
    data: inputData,
  },
});

export const getProfile = (data) => ({
  type: SET_PROFILE,
  payload: {
    data: data,
  },

});

export const setNotifications = (inputData) => ({
  type: SET_NOTIFICATIONS,
  payload: {
    data: inputData,
  },
});

export const setActiveQuiz = (inputData) => ({
  type: SET_ACTIVE_QUIZ,
  payload: {
    data: inputData,
  },
});

export const setActiveAnswer = (inputData) => ({
  type: SET_ACTIVE_ANSWER,
  payload: {
    data: inputData,
  },
});
