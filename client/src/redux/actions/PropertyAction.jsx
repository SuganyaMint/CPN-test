import ApiUrl from "../../service/ApiUrl";
import { ApiRouter } from "../../service/ApiRouter";


export const ActionTypes = {
  GET_PROPERTIES: "GET_PROPERTIES",
};

export const properties = () => async (dispatch) => {
  try {
    console.log("Fetching properties from API...");
    const res = await ApiUrl.get(ApiRouter.properties.properties);
    console.log(res.status);
    if (res.status == 200) {
      dispatch({
        type: ActionTypes.GET_PROPERTIES,
        payload: res.data.data,
      });
    }else{
      console.log("Failed to fetch properties, status code:", res.status);
    }
  } catch (error) {
    console.log(error);
  }
};


export const addToFavorites = (username, property_id) => async () => {
  try {
    console.log("Adding to favorites...");
    const res = await ApiUrl.post(ApiRouter.favorites.add, { username, property_id });
    console.log(res.status);
    if (res.status === 200) {
      return res.data;
    } else {
      console.log("Failed to add to favorites, status code:", res.status);
    }
  } catch (error) {
    console.log(error);
  }
};
export const removeFromFavorites = (username, property_id) => async () => {
  try {
    console.log("Removing from favorites...");
    const res = await ApiUrl.post(ApiRouter.favorites.remove, { username, property_id });
    console.log(res.status);
    if (res.status === 200) {
      return res.data;
    } else {
      console.log("Failed to remove from favorites, status code:", res.status);
    }
  } catch (error) {
    console.log(error);
  }
};