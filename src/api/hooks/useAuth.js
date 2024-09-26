import { useEffect } from "react";
// import { TokenContext } from "../../context/delete_tokenContext";
import { useDispatch, useSelector } from "react-redux";
import { authLogout, authRequestAsync } from "../../store/auth/action.js";

export const useAuth = () => {
  // const { delToken } = useContext(TokenContext);

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth.data);
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  useEffect(() => {
    dispatch(authRequestAsync());
    // dispatch(authRequest());
    // axios(`${URL_API}/api/v1/me`, {
    //   headers: {
    //     Authorization: `bearer ${token}`,
    //   },
    // })
    //   .then(({ data: { name, icon_img: iconImg } }) => {
    //     const img = iconImg?.replace(/\?.*?/, "");
    //     const data = { name, img };
    //     setAuth(data);
    //     dispatch(authRequestSuccess(data));
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //     setAuth({});
    //     dispatch(actionDeleteToken());
    //     dispatch(authRequestError(err));
    //   });
  }, [token]);

  const clearAuth = () => {
    dispatch(authLogout());
  };

  return [auth, loading, error, clearAuth];
};
