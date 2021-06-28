import { TOGGLE_MENU } from "../types";

const initialState = {
  open: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_MENU:
      return {
        ...state,
        open: action.payload,
      };
    default:
      return state;
  }
}
