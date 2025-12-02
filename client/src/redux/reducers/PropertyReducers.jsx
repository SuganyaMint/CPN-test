import { ActionTypes } from "../actions/PropertyAction";

const initialState = {
  properties: [],

};

export const PropertyReducers = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_PROPERTIES:
      return { ...state, properties: action.payload };
    default:
      return state;
  }
};