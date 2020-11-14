import {
  SET_JOBS,
  LOADING_DATA,
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
  axios
    .get("/jobs")
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: SET_JOBS,
        payload: res.data,
      });
    })
    .catch((err) => console.error(err));
};

export const getUserData = (userHandle) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  return new Promise((resolve, reject) =>
    axios
      .get(`/user/${userHandle}`)
      .then((res) => {
        console.log(res);
        dispatch({
          type: SET_JOBS,
          payload: res.data.jobs,
        });
        resolve(res.data.user);
      })
      .catch((err) => {
        dispatch({
          type: SET_JOBS,
          payload: null,
        });
        reject(err);
      })
  );
};
