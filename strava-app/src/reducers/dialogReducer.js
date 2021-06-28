import { SHOW_DIALOG, HIDE_DIALOG } from "../types";

const initialState = {
    isOpen: false,
    yesCallback: null,
    noCallback: null,
    title: "",
    content: ""
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_DIALOG:
        return {
            ...state,
            ...action.payload
        }
    case HIDE_DIALOG:
        return {
            ...state,
            ...action.payload
        }
    default:
      return state;
  }
}
