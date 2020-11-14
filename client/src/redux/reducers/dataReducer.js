import { LOADING_DATA, SET_JOBS } from "../types";

const initialState = {
  loading: false,
  jobs: [],
};

// eslint-disable-next-line
export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_JOBS:
      return {
        ...state,
        vibes: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
