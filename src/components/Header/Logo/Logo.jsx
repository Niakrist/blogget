import { Link } from "react-router-dom";
import style from "./Logo.module.css";
import logoSrc from "./img/logo.svg";

export const Logo = () => {
  return (
    <Link to="/">
      <span className={style.link}>
        <img className={style.logo} src={logoSrc} alt="logo" />
      </span>
    </Link>
  );
};
