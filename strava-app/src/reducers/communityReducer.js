import { GET_USERS_SUCCESS,GET_COMMUNITY_SUCCESS,  ADD_USER_SUCCESS,  ADD_RELATION_SUCCESS } from "../types";

const initialState = {
  users: [],
  community: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
      };
    case GET_COMMUNITY_SUCCESS:
      return {
        ...state,
        community: action.payload,
      };
    case ADD_USER_SUCCESS:
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case ADD_RELATION_SUCCESS:
      return {
        ...state,
      };
    default:
      return state;
  }
}
