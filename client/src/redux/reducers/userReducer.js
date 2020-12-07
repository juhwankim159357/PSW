import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  ADD_APPLICATION,
} from "../types";

const initialState = {
  authenticated: false,
  loading: false,
  credentials: {
    contactInfo: {},
  },
};

// eslint-disable-next-line
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        ...state,
        authenticated: true,
        loading: false,
        credentials: {
          ...state.credentials,
          ...action.payload,
          contactInfo: {
            ...state.credentials.contactInfo,
            ...action.payload.contactInfo,
          },
          applications: action.payload.applications,
        },
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };

    case ADD_APPLICATION:
      console.log("IN ADD_APP");
      console.log(state.credentials.applications);
      console.log(action.payload.jobPosting);
      return {
        ...state,
        loading: false,
        credentials: {
          ...state.credentials,
          applications: [
            ...state.credentials.applications,
            action.payload.jobPosting,
          ]
        }
      }
    default:
      return state;
  }
}
