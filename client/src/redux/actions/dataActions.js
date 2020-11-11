import {
    SET_VIBES,
    LOADING_DATA,
    SET_ERRORS,
    LOADING_UI,
    CLEAR_ERRORS,
    STOP_LOADING_UI,
    DIALOG_OPEN,
    DIALOG_CLOSED,
  } from "../types";
  import axios from "axios";

export const getUserData = (userHandle) => (dispatch) => {
    dispatch({type: LOADING_DATA});
    return new Promise((resolve, reject) => 
      axios
      .get(`/user/${userHandle}`)
      .then(res => {
        console.log(res);
        dispatch({
          type: SET_VIBES,
          payload: res.data.vibes
        });
        resolve(res.data.user);
       })
       .catch((err) => {
          dispatch({
            type: SET_VIBES,
            payload: null,
        })
        reject(err);
      })
    )
  }
  