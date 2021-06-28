import { combineReducers } from "redux";
import menuReducer from "./menuReducer";
import alertReducer from "./alertReducer";
import campaignsReducer from "./campaignsReducer";
import activitiesReducer from "./activitiesReducer";
import dialogReducer from "./dialogReducer";
import progressBarReducer from "./progressBarReducer";
import modalReducer from "./modalReducer";

export default combineReducers({
    menu: menuReducer,
    alert: alertReducer,
    activities: activitiesReducer,
    campaigns: campaignsReducer,
    dialog: dialogReducer,
    progressBar: progressBarReducer,
    modal: modalReducer,
});
