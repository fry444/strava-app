import { GET_CAMPAIGNS_SUCCESS, GET_CAMPAIGN_SUCCESS, ADD_CAMPAIGN_SUCCESS, UPDATE_CAMPAIGN_STATUS, EDIT_CAMPAIGN_SUCCESS, SHOW_EDIT_CAMPAIGN } from "../types";


const initialState = {
  campaigns: [],
  campaigndelete: null,
  campaignedit: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CAMPAIGNS_SUCCESS:
      return {
        ...state,
        campaigns: action.payload,
        campaignedit: null,
      };
    case GET_CAMPAIGN_SUCCESS:
      return {
        ...state,
        campaignedit: action.payload,
      };
    case ADD_CAMPAIGN_SUCCESS:
      return {
        ...state,
        campaigns: [...state.campaigns, action.payload],
      };
    case UPDATE_CAMPAIGN_STATUS:
      const index = state.campaigns.findIndex(c => c.id === action.payload.campaignId);
      return {
        ...state,
        campaigns: state.campaigns.map(c => c.id === action.payload.campaignId ?
          { ...state.campaigns[index], active: action.payload.isActive } : c)
      }
    case SHOW_EDIT_CAMPAIGN:
      return {
        ...state,
        campaignedit: action.payload,
      };
    case EDIT_CAMPAIGN_SUCCESS:
      const camps = state.campaigns.filter(c => c.id !== action.payload.id);
      return {
        ...state,
        campaigns: [...camps, action.payload]
      };
    default:
      return state;
  }
}
