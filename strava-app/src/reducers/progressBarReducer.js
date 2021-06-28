import { SHOW_PROGRESS_BAR, HIDE_PROGRESS_BAR } from "../types";

const initialState = {
  isVisible: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_PROGRESS_BAR:
      return {
        ...state,
        ...action.payload,
      };
    case HIDE_PROGRESS_BAR:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}