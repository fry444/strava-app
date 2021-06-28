import { SHOW_PROGRESS_BAR, HIDE_PROGRESS_BAR } from "../types";

export function showProgressBarAction() {
  return (dispatch) => {
    dispatch(showProgressBar());
  };
}

const showProgressBar = () => ({
  type: SHOW_PROGRESS_BAR,
  payload: { isVisible: true }
});

export function hideProgressBarAction() {
  return (dispatch) => {
    dispatch(hideProgressBar());
  };
}

const hideProgressBar = () => ({
  type: HIDE_PROGRESS_BAR,
  payload: { isVisible: false }
});