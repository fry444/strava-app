import { SHOW_MODAL, HIDE_MODAL } from "../types";

export function showModalAction(modal) {
  return (dispatch) => {
    dispatch(showModal(modal));
  }
}

export function hideModalAction(modal) {
  return (dispatch) => {
    dispatch(hideModal(modal));
  }
}

const showModal = (modal) => ({
  type: SHOW_MODAL,
  payload: modal,
});

const hideModal = (modal) => ({
  type: HIDE_MODAL,
  payload: modal,
});