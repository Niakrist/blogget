import { Text } from "../../../../ui/Text";
import style from "./Logout.module.css";
import PropTypes from "prop-types";

const Logout = ({ delToken, clearAuth }) => {
  const handleClick = () => {
    console.log("токен удален");
    delToken();
    clearAuth();
  };

  return (
    <Text As="a" className={style.logout} onClick={handleClick} href="/">
      Выйти
    </Text>
  );
};

export default Logout;

Logout.propTypes = {
  delToken: PropTypes.func,
};
