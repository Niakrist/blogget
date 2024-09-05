import PropTypes from "prop-types";
import { Text } from "../../../ui/Text";
import { ReactComponent as LoginIcon } from "./img/login.svg";
import { urlAuth } from "../../../api/auth";
import style from "./Auth.module.css";
import { useState } from "react";
import { Logout } from "./Logout";
import { useAuth } from "../../../api/hooks/useAuth";

export const Auth = ({ token, delToken }) => {
  const [auth, setAuth] = useState({});

  const [isLogout, setIsLogout] = useState(false);

  useAuth(token, setAuth);

  const handleClick = () => {
    setIsLogout((prevState) => !prevState);
  };

  return (
    <>
      <div className={style.container}>
        {auth.name ? (
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
              <Text>{auth.name}</Text>
            ) : (
              <Logout auth={auth} delToken={delToken} />
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
