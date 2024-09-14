import { Text } from "../../../../ui/Text";
import style from "./Logout.module.css";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { actionDeleteToken } from "../../../../store/tokenReducer.js";

const Logout = ({ clearAuth }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    console.log("токен удален");
    dispatch(actionDeleteToken());
    clearAuth();
  };

  return (
    <Text As="div" className={style.logout} onClick={handleClick}>
      Выйти
    </Text>
  );
};

export default Logout;

Logout.propTypes = {
  delToken: PropTypes.func,
};
