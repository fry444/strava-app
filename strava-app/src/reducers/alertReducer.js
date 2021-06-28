import { SHOW_ALERT, HIDE_ALERT } from "../types";

const initialState = {
  isOpen: false,
  severity: "info",
  message: ""
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_ALERT:
      return {
        ...state,
        ...action.payload,
      };
    case HIDE_ALERT:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
