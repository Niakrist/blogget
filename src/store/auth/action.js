import axios from "axios";
import { URL_API } from "../../api/const";
import { actionDeleteToken } from "../tokenReducer";

export const AUTH_REQUEST = "AUTH_REQUEST";
export const AUTH_REQUEST_SUCCESS = "AUTH_REQUEST_SUCCESS";
export const AUTH_REQUEST_ERROR = "AUTH_REQUEST_ERROR";
export const AUTH_LOGOUT = "AUTH_LOGOUT";

export const authRequest = () => {
  return { type: AUTH_REQUEST };
};

export const authRequestSuccess = (data) => {
  return { type: AUTH_REQUEST_SUCCESS, data };
};

export const authRequestError = (error) => {
  return { type: AUTH_REQUEST_ERROR, error };
};

export const authLogout = () => {
  return { type: AUTH_LOGOUT };
};

export const authRequestAsync = () => (dispatch, getState) => {
  const token = getState().token.token;

  if (!token) return;
  const fetchToken = async () => {
    dispatch(authRequest());
    try {
      const response = await axios.get(`${URL_API}/api/v1/me`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });

      if (response.status === 401) {
        throw new Error("Вы не авторизированы");
      }

      const {
        data: { name, icon_img: iconImg },
      } = response;
      const img = iconImg?.replace(/\?.*$/, "");
      dispatch(authRequestSuccess({ name, img }));
    } catch (error) {
      console.log("Перехват ошибки! ", error);
      dispatch(actionDeleteToken());
      dispatch(authRequestError(error.toString()));
    }
  };
  fetchToken();
};
