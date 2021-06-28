import { GET_ACTIVITIES_SUCCESS, ADD_ACTIVITY_SUCCESS } from "../types";

const initialState = {
  activities: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ACTIVITIES_SUCCESS:
      return {
        ...state,
        activities: action.payload,
      };
    case ADD_ACTIVITY_SUCCESS:
      return {
        ...state,
        activities: [...state.activities, action.payload],
      };
    default:
      return state;
  }
}
