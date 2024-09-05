import { Text } from "../../../../ui/Text";
import style from "./Logout.module.css";
import PropTypes from "prop-types";

const Logout = ({ delToken }) => {
  const handleClick = () => {
    console.log("токен удален");
    delToken();
  };

  return (
    <div className={style.container}>
      <Text As="a" className={style.logout} onClick={handleClick} href="/">
        Выйти
      </Text>
    </div>
  );
};

export default Logout;

Logout.propTypes = {
  delToken: PropTypes.func,
};
