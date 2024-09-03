import style from "./Auth.module.css";
import { ReactComponent as LoginIcon } from "./img/login.svg";
import PropTypes from "prop-types";

export const Auth = ({ auth }) => {
  return (
    <button className={style.button}>
      {auth ? (
        <LoginIcon width={30} height={30} fill={"#cc6633"} />
      ) : (
        <div>{auth}</div>
      )}
    </button>
  );
};

Auth.propTypes = {
  auth: PropTypes.string.isRequired,
};
