import { ActionTypes } from "../actions/UserAction";

const initialState = {
  favorites: [],
  user: [],
  user_id: {},
};

export const UserReducers = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_FAVORITES:
      return { ...state, favorites: action.payload };
    case ActionTypes.ALLUSER:
      return { ...state, user: action.payload };
    case ActionTypes.USER_ID:
      return { ...state, user_id: action.payload };
    case ActionTypes.GET_FAVORITES:
      return { ...state, favorites: action.payload };
    default:
      return state;
  }
};
