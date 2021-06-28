import { SHOW_MODAL, HIDE_MODAL } from "../types";

const initialState = {
    isOpen: false,
    callback: null,
    title: "",
    content: "",
    component: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_MODAL:
        return {
            ...state,
            ...action.payload
        }
    case HIDE_MODAL:
        return {
            ...state,
            ...action.payload
        }
    default:
      return state;
  }
}
