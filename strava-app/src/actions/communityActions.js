import { GET_USERS_SUCCESS, GET_COMMUNITY_SUCCESS, ADD_USER_SUCCESS, ADD_RELATION_SUCCESS } from "../types";
import { showAlertAction } from "./alertActions";
import { hideProgressBarAction, showProgressBarAction } from "./progressBarActions";
import axiosClient from "../config/axios";

export function getUsersAction() {
  return async (dispatch) => {
    dispatch(showProgressBarAction());
    try {
      const response = await axiosClient.get(`/community`);
      dispatch(getUsersSuccess(response.data));
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

export function getCommunityAction(user) {
  return async (dispatch) => {
    dispatch(showProgressBarAction());
    try {
      const response = await axiosClient.get(`/community/${user}`);
      dispatch(getCommunitySuccess(response.data));
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

export function addUserAction(user, redirect) {
  return async (dispatch) => {
    dispatch(showProgressBarAction());
    const newUser = {
      username: user
    };
    axiosClient.post("/community/user", newUser)
      .then(response => {
        dispatch(addUserSuccess(user));
        const alert = {
          isOpen: true,
          severity: "success",
          message: "El usuario se agregó correctamente"
        }
        dispatch(showAlertAction(alert));
        redirect()
      })
      .catch(error => {
        console.log(error);
        const alert = {
          isOpen: true,
          severity: "error",
          message: "Ocurrió un error al registrar el usuario"
        }
        dispatch(showAlertAction(alert));
      })
      .finally(() => {
        dispatch(hideProgressBarAction())
      });
  };
}

export function addRelationAction(userFrom, userTo, redirect) {
  return async (dispatch) => {
    dispatch(showProgressBarAction());
    axiosClient.post(`/community/follow?userFrom=${userFrom}&userTo=${userTo}`)
      .then(response => {
        dispatch(addRelationSuccess(response.data));
        const alert = {
          isOpen: true,
          severity: "success",
          message: "La relación se agregó correctamente"
        }
        dispatch(showAlertAction(alert));
        redirect()
      })
      .catch(error => {
        const alert = {
          isOpen: true,
          severity: "error",
          message: "Ocurrió un error al la relación"
        }
        dispatch(showAlertAction(alert));
      })
      .finally(() => {
        dispatch(hideProgressBarAction())
      });
  };
}

const getUsersSuccess = (users) => ({
  type: GET_USERS_SUCCESS,
  payload: users,
});

const getCommunitySuccess = (users) => ({
  type: GET_COMMUNITY_SUCCESS,
  payload: users,
});

const addUserSuccess = (user) => ({
  type: ADD_USER_SUCCESS,
  payload: user,
});

const addRelationSuccess = () => ({
  type: ADD_RELATION_SUCCESS,
  payload: '',
});