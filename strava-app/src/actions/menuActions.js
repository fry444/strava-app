import { TOGGLE_MENU } from "../types";

// Toggle Menu
export function toggleMenuAction(open) {
  return (dispatch) => {
    dispatch(toggleMenu(open));
  };
}

const toggleMenu = (open) => ({
  type: TOGGLE_MENU,
  payload: open,
});
