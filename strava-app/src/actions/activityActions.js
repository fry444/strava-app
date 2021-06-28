import { GET_ACTIVITIES_SUCCESS, ADD_ACTIVITY_SUCCESS } from "../types";
import { showAlertAction } from "./alertActions";
import { hideProgressBarAction, showProgressBarAction } from "./progressBarActions";
import axiosClient from "../config/axios";

export function getActivitiesAction() {
  return async (dispatch) => {
    dispatch(showProgressBarAction());
    try {
      const response = await axiosClient.get(`/activities`);
      console.log(response.data);
      dispatch(getActivitiesSuccess(response.data));
    } catch (error) {
      const alert = {
        isOpen: true,
        severity: "error",
        message: "Ocurrió un error, intentá de nuevo"
      }
      dispatch(showAlertAction(alert));
    } finally {
      dispatch(hideProgressBarAction())
    }
  };
}

export function getUserActivitiesAction(user) {
  return async (dispatch) => {
    dispatch(showProgressBarAction());
    try {
      const response = await axiosClient.get(`/activities/${user}`);
      dispatch(getActivitiesSuccess(response.data));
    } catch (error) {
      const alert = {
        isOpen: true,
        severity: "error",
        message: "Ocurrió un error, intentá de nuevo"
      }
      dispatch(showAlertAction(alert));
    } finally {
      dispatch(hideProgressBarAction())
    }
  };
}

export function addActivityAction(activity, redirect) {
  return async (dispatch) => {
    dispatch(showProgressBarAction());
    if(activity.type==="photo"){
      activity.data = `{"url":"${activity.url}", "comment":"${activity.comment}"}`;
    }
    if(activity.type==="publication"){
      activity.data = `{"text":"${activity.text}"}`;
    }
    if(activity.type==="phisical"){
      activity.data = `{"type":"${activity.phisicalType}","duration":"${activity.duration}","distance":"${activity.distance}","effort":"${activity.effort}"}`;
    }
    axiosClient.post("/activities", activity)
      .then(response => {
        dispatch(addActivitySuccess(response.data));
        const alert = {
          isOpen: true,
          severity: "success",
          message: "La actividad se agregó correctamente"
        }
        dispatch(showAlertAction(alert));
        redirect()
      })
      .catch(error => {
        const alert = {
          isOpen: true,
          severity: "error",
          message: "Ocurrió un error al registrar la actividad"
        }
        dispatch(showAlertAction(alert));
      })
      .finally(() => {
        dispatch(hideProgressBarAction())
      });
  };
}

const getActivitiesSuccess = (activities) => ({
  type: GET_ACTIVITIES_SUCCESS,
  payload: activities,
});

const addActivitySuccess = (activity) => ({
  type: ADD_ACTIVITY_SUCCESS,
  payload: activity,
});