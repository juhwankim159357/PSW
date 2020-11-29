import {
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  STOP_LOADING_UI,
  DIALOG_OPEN,
  DIALOG_CLOSED,
} from "../types";

const initialState = {
  loading: false,
  dialog: false,
  errors: null,
};

// eslint-disable-next-line
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        errors: null,
      };
    case LOADING_UI:
      return {
        ...state,
        loading: true,
      };
    case STOP_LOADING_UI:
      return {
        ...state,
        loading: false,
      };
    case DIALOG_OPEN:
      return {
        ...state,
        dialog: true,
      };
    case DIALOG_CLOSED:
      return {
        ...state,
        dialog: false,
      };
    default:
      return state;
  }
}
