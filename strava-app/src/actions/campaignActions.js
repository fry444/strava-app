import { GET_CAMPAIGNS_SUCCESS, GET_CAMPAIGN_SUCCESS, ADD_CAMPAIGN_SUCCESS, UPDATE_CAMPAIGN_STATUS, EDIT_CAMPAIGN_SUCCESS, SHOW_EDIT_CAMPAIGN } from "../types";
import { showAlertAction } from "../actions/alertActions";
import { hideProgressBarAction, showProgressBarAction } from "../actions/progressBarActions";
import axiosClient from "../config/axios";

export function getCampaignsAction() {
  return async (dispatch) => {
    dispatch(showProgressBarAction());
    try {
      const response = await axiosClient.get("/campaigns");
      dispatch(getCampaignsSuccess(response.data));
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

export function getCampaignAction(campaignId) {
  return async (dispatch) => {
    dispatch(showProgressBarAction());
    try {
      const response = await axiosClient.get(`/campaigns/${campaignId}`);
      dispatch(getCampaignSuccess(response.data));
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

export function showEditCampaignAction(campaign) {
  return async (dispatch) => {
    dispatch(showEditCampaign(campaign));
  }
}

export function addCampaignAction(campaign, redirect) {
  return async (dispatch) => {
    dispatch(showProgressBarAction());
    const formData = new FormData();
    formData.append('name', campaign.name);
    formData.append('description', campaign.description);
    formData.append('file', campaign.file);
    formData.append('start', campaign.start);
    formData.append('finish', campaign.finish);
    formData.append('placeId', campaign.placeId);
    formData.append('notificationEnabled', campaign.notificationEnabled);
    formData.append('notificationTitle', campaign.notificationTitle);
    formData.append('notificationBody', campaign.notificationBody);
    formData.append('repeatNotificationFreq', campaign.repeatNotificationFreq);
    formData.append('triggerDistance', campaign.triggerDistance);
    formData.append('eventEnabled', campaign.eventEnabled);
    formData.append('eventDate', campaign.eventDate);
    formData.append('drawEnabled', campaign.drawEnabled);
    formData.append('drawDate', campaign.drawDate);
    formData.append('mandatoryPresenceEnabled', campaign.mandatoryPresenceEnabled);
    formData.append('drawDescription', campaign.drawDescription);
    let index = 0;
    campaign.selectedCategories.forEach(category => {
      formData.append(`categories[${index++}].id`, category.id);
    });
    const config = { headers: { 'content-type': 'multipart/form-data' } }
    axiosClient.post("/campaigns", formData, config)
      .then(response => {
        dispatch(addCampaignSuccess(response.data));
        const alert = {
          isOpen: true,
          severity: "success",
          message: "La campaña se agregó correctamente"
        }
        dispatch(showAlertAction(alert));
        redirect()
      })
      .catch(error => {
        const alert = {
          isOpen: true,
          severity: "error",
          message: "Ocurrió un error al registrar la campaña"
        }
        dispatch(showAlertAction(alert));
      })
      .finally(() => {
        dispatch(hideProgressBarAction())
      });
  };
}

export function editCampaignAction(campaign, redirect) {
  return async (dispatch) => {
    dispatch(showProgressBarAction());
    let alert = {
      isOpen: true,
      severity: "success",
      message: "La campaña fue actualizada correctamente!"
    }
    try {
      const formData = new FormData();
      formData.append('name', campaign.name);
      formData.append('description', campaign.description);
      formData.append('start', campaign.start);
      formData.append('finish', campaign.finish);
      formData.append('placeId', campaign.placeId);
      formData.append('notificationEnabled', campaign.notificationEnabled);
      formData.append('notificationTitle', campaign.notificationTitle);
      formData.append('notificationBody', campaign.notificationBody);
      formData.append('repeatNotificationFreq', campaign.repeatNotificationFreq);
      formData.append('triggerDistance', campaign.triggerDistance);
      formData.append('eventEnabled', campaign.eventEnabled);
      formData.append('eventDate', campaign.eventDate);
      formData.append('drawEnabled', campaign.drawEnabled);
      formData.append('drawDate', campaign.drawDate);
      formData.append('mandatoryPresenceEnabled', campaign.mandatoryPresenceEnabled);
      formData.append('drawDescription', campaign.drawDescription);
      let index = 0;
      campaign.selectedCategories.forEach(category => {
        formData.append(`categories[${index++}].id`, category.id);
      });
      if (campaign.file) {
        formData.append('file', campaign.file);
      }
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }
      const response = await axiosClient.put(`/campaigns/${campaign.id}`, formData, config);
      dispatch(editCampaignSuccess(response.data));
      redirect();
    } catch (error) {
      alert = {
        isOpen: true,
        severity: "error",
        message: "Ocurrió un error al actualizar la campaña"
      };
    } finally {
      dispatch(showAlertAction(alert));
      dispatch(hideProgressBarAction());
    }
  };
}

export function updateCampaignStatusAction(campaignId) {
  return async (dispatch) => {
    dispatch(showProgressBarAction());
    axiosClient.put(`/campaigns/${campaignId}/status`)
      .then(response => {
        dispatch(updateCampaignStatus({
          campaignId,
          isActive: response.data
        }));
      })
      .catch(error => {
        const alert = {
          isOpen: true,
          severity: "error",
          message: "Hubo un error, intentá de nuevo"
        }
        dispatch(showAlertAction(alert));
      })
      .finally(() => {
        dispatch(hideProgressBarAction())
      })
  }
}

export function deleteCampaignAction(id) {
  return async (dispatch) => {
    dispatch(showProgressBarAction());
    let alert = {
      isOpen: true,
      severity: "success",
      message: "La campaña fue eliminada correctamente!"
    };
    try {   
      await axiosClient.delete("/campaigns/" + id);
      dispatch(getCampaignsAction())
    } catch (error) {
      alert = {
        isOpen: true,
        severity: "error",
        message: "Ocurrió un error al eliminar la campaña"
      };
    } finally {
      dispatch(hideProgressBarAction());
      dispatch(showAlertAction(alert))
    }
  };
}

const updateCampaignStatus = (campaign) => ({
  type: UPDATE_CAMPAIGN_STATUS,
  payload: campaign
});

const editCampaignSuccess = (campaign) => ({
  type: EDIT_CAMPAIGN_SUCCESS,
  payload: campaign,
});

const getCampaignsSuccess = (campaigns) => ({
  type: GET_CAMPAIGNS_SUCCESS,
  payload: campaigns,
});

const getCampaignSuccess = (campaign) => ({
  type: GET_CAMPAIGN_SUCCESS,
  payload: campaign,
});

const showEditCampaign = (campaign) => ({
  type: SHOW_EDIT_CAMPAIGN,
  payload: campaign,
});

const addCampaignSuccess = (campaign) => ({
  type: ADD_CAMPAIGN_SUCCESS,
  payload: campaign,
});