import {
    LOADING_DATA,
  } from "../types";
  
  const initialState = {
    loading: false,
  };

  export default function (state = initialState, action) {
    switch (action.type) {
      case LOADING_DATA:
        return {
          ...state,
          loading: true,
        };
      default:
        return state;
    }
  }
  