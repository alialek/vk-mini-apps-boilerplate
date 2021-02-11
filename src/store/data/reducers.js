import {
  SET_COLOR_SCHEME,
  SET_SNACKBAR,
  SET_IS_NOTIFICATIONS_ENABLED,
  SET_IS_ONBOARDING_VIEWED,
  SET_PARTICIPATION_STATUS,
  SET_PARTICIPANT_INFO,
  SET_ABOUT,
  SET_NOTIFICATIONS,
  SET_PROFILE,
  SET_ACTIVE_QUIZ, SET_ACTIVE_ANSWER,
} from "./actionTypes";

const initialState = {
  colorScheme: "client_light",
  isOnboardingViewed: true,
  isNotificationsEnabled: false,
  snackbar: null,
  profile: {},
  activeAnswer: null,
  activeQuiz: null,
};

export const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COLOR_SCHEME: {
      return {
        ...state,
        colorScheme: action.payload.data,
      };
    }
    case SET_SNACKBAR: {
      return {
        ...state,
        snackbar: action.payload.data,
      };
    }
    case SET_IS_ONBOARDING_VIEWED: {
      return {
        ...state,
        isOnboardingViewed: action.payload.data,
      };
    }
    case SET_IS_NOTIFICATIONS_ENABLED: {
      return {
        ...state,
        isNotificationsEnabled: action.payload.data,
      };
    }
    case SET_PROFILE: {
      return {
        ...state,
        profile: action.payload.data,
      };
    }


    case SET_NOTIFICATIONS: {
      return {
        ...state,
        notifications: action.payload.data,
      };
    }
    case SET_ABOUT: {
      return {
        ...state,
        about: action.payload.data,
      };
    }
    case SET_PARTICIPANT_INFO: {
      return {
        ...state,
        participantInfo: action.payload.data,
      };
    }
    case SET_PARTICIPATION_STATUS: {
      return {
        ...state,
        participationStatus: action.payload.data,
      };
    }
    case SET_ACTIVE_QUIZ: {
      return {
        ...state,
        activeQuiz: action.payload.data,
      };
    }
    case SET_ACTIVE_ANSWER: {
      return {
        ...state,
        activeAnswer: action.payload.data,
      };
    }

    default: {
      return state;
    }
  }
};
