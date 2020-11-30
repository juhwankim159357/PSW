import jobs from "../../pages/jobs/jobs";
import { LOADING_DATA, SET_JOBS, SET_JOB, DELETE_JOB } from "../types";

const initialState = {
  loading: false,
  jobs: [],
  job: {},
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
        loading: false,
        jobs: action.payload,
      };

    case SET_JOB:
      return {
        ...state,
        job: action.payload,
      };

    default:
      return state;
  }
}
