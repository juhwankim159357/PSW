import {
  SET_JOBS,
  LOADING_DATA,
  SET_JOB,
  STOP_LOADING_UI,
  LOADING_UI,
  // SET_ERRORS,
  // LOADING_UI,
  // CLEAR_ERRORS,
  // STOP_LOADING_UI,
  // DIALOG_OPEN,
  // DIALOG_CLOSED,
} from "../types";
import axios from "axios";

export const getAllJobs = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  console.log("Before fetching");
  axios
    .get("/jobs")
    .then((res) => {
      dispatch({
        type: SET_JOBS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_JOBS,
        payload: [],
      });
    });
};

export const getJob = (jobId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/jobs/job/${jobId}`)
    .then((res) => {
      dispatch({
        type: SET_JOB,
        payload: res.data,
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => console.log(err));
};

export const postNewJob = (jobPostData, config, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/jobs/post-job", jobPostData, config)
    .then((res) => {
      dispatch({
        type: SET_JOB,
        payload: res.data,
      });
      history.push("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getUserData = (userName) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  return new Promise((resolve, reject) =>
    axios
      .get(`/user`)
      .then((res) => {
        console.log(res);
        resolve(res.data.user);
      })
      .catch((err) => {
        reject(err);
      })
  );
};
