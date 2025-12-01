import ApiUrl from "../../service/ApiUrl";
import { ApiRouter, apiKey } from "../../service/ApiRouter";
// ApiUrl.defaults.withCredentials = true;
// ApiUrl.defaults.headers.common["x-api-key"] = apiKey;

export const ActionTypes = {
  GET_FAVORITES: "GET_FAVORITES",
  ALLUSER: "ALLUSER",
  USER_ID: "USER_ID",
};

export const user_favorites = (userNow) => async (dispatch) => {
  try {
    const res = await ApiUrl.get(ApiRouter.user.favorites + `/${userNow}`);
    dispatch({
      type: ActionTypes.GET_FAVORITES,
      payload: res.data.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const alluser = () => async (dispatch) => {
  try {
    const res = await ApiUrl.get(ApiRouter.user.user);
    dispatch({
      type: ActionTypes.ALLUSER,
      payload: res.data.data,
    });
  } catch (error) {
    console.log(error);
  }
};
export const alluser_id = (username) => async (dispatch) => {
  try {
    const res = await ApiUrl.get(ApiRouter.user.user + `/${username}`);
    dispatch({
      type: ActionTypes.USER_ID,
      payload: res.data.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const register = (username) => async (dispatch) => {
  try {
    const res = await ApiUrl.post(ApiRouter.user.register, {
      username: username,
    });
    dispatch({
      type: ActionTypes.USER_ID,
      payload: res.data.data,
    });
    console.log("register response:", res.status);
    return res;
  } catch (error) {
    console.log(error);
  }
};

