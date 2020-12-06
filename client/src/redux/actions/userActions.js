import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER,
} from "../types";
import axios from "axios";

export const loginUser = (userData, history) => (dispatch) => {
  // This is the action type?
  console.log("In loginUser");
  dispatch({ type: LOADING_UI });
  console.log(userData);
  axios
    .post("/users/login", userData)
    .then((res) => {
      console.log(res);
      setAuthorizationHeader(res.data.token);
      dispatch({type: SET_USER, payload: res.data.user});
      dispatch({ type: CLEAR_ERRORS });
      history.push(`/user`);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response,
      });
    });
};

export const getUserData = () => (dispatch) => {
  dispatch({ type: LOADING_USER });
  console.log("In getUserData");
  axios
    .get("/users/user")
    .then((res) => {
      dispatch({
        type: SET_USER,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("x-auth-token");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTHENTICATED });
};

export const signupUser = (newUserData, history) => (dispatch) => {
  console.log("Signing up");
  console.log("newUserData ---", newUserData);
  dispatch({ type: LOADING_UI });
  axios
    .post("/users/signup", newUserData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/");
    })
    .catch((err) => {
      console.log("Err ---",err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const uploadResume = (formData, config) => (dispatch) => {
  axios
  .post("/users/upload", formData, config)
  .then((res) => {
    alert("The file is successfully uploaded");
    dispatch({type: CLEAR_ERRORS});
  })
  .catch((err) => {
    console.log(err);
    dispatch({
      type: SET_ERRORS,
      payload: err.response,
    });
  });

}

export const resetPassword = (resetData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post(`/users/reset-password/${resetData.token}`, resetData)
    .then((res) => {
      dispatch({ type: CLEAR_ERRORS });
      history.push(`/login`);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response,
      });
    });
};

export const updatePoints = (pointData, config, history) => (dispatch) => {
  console.log("IN updatePoints");
  dispatch({type: LOADING_UI});

  axios.post('/users/scoring', pointData, config)
  .then((res) => {
    dispatch({ type: CLEAR_ERRORS});
    history.push('/jobs');
  })
  .catch((err) => {
    dispatch({
      type: SET_ERRORS,
      payload: err.resonse,
    });
  });
};

const setAuthorizationHeader = (token) => {
  const XAuthToken = token;
  localStorage.setItem("x-auth-token", XAuthToken);
  axios.defaults.headers.common["Authorization"] = XAuthToken;
};
