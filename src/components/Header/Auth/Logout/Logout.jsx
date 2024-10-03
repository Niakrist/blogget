import { Text } from "../../../../ui/Text";
import style from "./Logout.module.css";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { actionDeleteToken } from "../../../../store/tokenReducer.js";
import { Link } from "react-router-dom";

const Logout = ({ clearAuth }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(actionDeleteToken());
    clearAuth();
  };

  return (
    <Link to="/">
      <Text As="div" className={style.logout} onClick={handleClick}>
        Выйти
      </Text>
    </Link>
  );
};

export default Logout;

Logout.propTypes = {
  delToken: PropTypes.func,
};
