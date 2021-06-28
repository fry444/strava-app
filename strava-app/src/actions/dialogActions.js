import { SHOW_DIALOG, HIDE_DIALOG } from "../types";

export function showDialogAction(dialog) {
  return (dispatch) => {
    dispatch(showDialog(dialog));
  };
}

export function hideDialogAction() {
  return (dispatch) => {
    dispatch(hideDialog());
  };
}

const showDialog = (dialog) => ({
  type: SHOW_DIALOG,
  payload: dialog,
});

const hideDialog = () => ({
  type: HIDE_DIALOG,
  payload: { isOpen: false }
});