import { combineReducers } from "redux";
import menuReducer from "./menuReducer";
import alertReducer from "./alertReducer";
import activitiesReducer from "./activitiesReducer";
import communityReducer from "./communityReducer";
import dialogReducer from "./dialogReducer";
import progressBarReducer from "./progressBarReducer";
import modalReducer from "./modalReducer";

export default combineReducers({
    menu: menuReducer,
    alert: alertReducer,
    activities: activitiesReducer,
    community: communityReducer,
    dialog: dialogReducer,
    progressBar: progressBarReducer,
    modal: modalReducer,
});
