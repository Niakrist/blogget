import PropTypes from "prop-types";
import { Text } from "../../../ui/Text";
import { ReactComponent as LoginIcon } from "./img/login.svg";
import { urlAuth } from "../../../api/auth";
import style from "./Auth.module.css";
import { useState } from "react";
import { Logout } from "./Logout";
import { useAuth } from "../../../api/hooks/useAuth.js";
import { Preloader } from "../../../ui/Preloader/index.js";

export const Auth = () => {
  // const { auth, clearAuth } = useContext(AuthContext);
  const [auth, loading, clearAuth] = useAuth();
  const [isLogout, setIsLogout] = useState(false);
  // const { delToken } = useContext(TokenContext);

  const handleClick = () => {
    setIsLogout((prevState) => !prevState);
  };

  return (
    <>
      {loading && <Preloader size="30px" />}
      <div className={style.container}>
        {auth?.name ? (
          <div>
            <button className={style.btn} onClick={handleClick}>
              <img
                className={style.img}
                src={auth.img}
                title={auth.name}
                alt={`Аватaр ${auth.name}`}
              />
            </button>
            {!isLogout ? (
              <Text className={style.login}>{auth.name}</Text>
            ) : (
              <Logout clearAuth={clearAuth} />
            )}
          </div>
        ) : (
          <>
            <Text As="a" className={style.authLink} href={urlAuth}>
              <LoginIcon width={30} height={30} fill={"#cc6633"} />
            </Text>
          </>
        )}
      </div>
    </>
  );
};

Auth.propTypes = {
  token: PropTypes.string,
  delToken: PropTypes.func,
};
