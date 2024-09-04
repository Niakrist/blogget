import PropTypes from "prop-types";
import { Text } from "../../../ui/Text";
import { ReactComponent as LoginIcon } from "./img/login.svg";
import { urlAuth } from "../../../api/auth";
import style from "./Auth.module.css";
import { useEffect, useState } from "react";
import { URL_API } from "../../../api/const";

export const Auth = ({ token }) => {
  const [auth, setAuth] = useState({});
  useEffect(() => {
    if (!token) return;
    fetch(`${URL_API}/api/v1/me`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then(({ name, icon_img: iconImg }) => {
        const img = iconImg.replace(/\?.*?/, "");
        setAuth({ name, img });
      });
  }, [token]);

  return (
    <div className={style.container}>
      {auth.name ? (
        <div>
          <button className={style.btn}>
            <img
              className={style.img}
              src={auth.img}
              title={auth.name}
              alt={`Аватaр ${auth.name}`}
            />
          </button>
          <Text>{auth.name}</Text>
        </div>
      ) : (
        <Text As="a" className={style.authLink} href={urlAuth}>
          <LoginIcon width={30} height={30} fill={"#cc6633"} />
        </Text>
      )}
    </div>
  );
};

Auth.propTypes = {
  token: PropTypes.string.isRequired,
};
