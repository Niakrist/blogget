import style from "./Logo.module.css";
import logoSrc from "./img/logo.svg";

export const Logo = () => {
  return (
    <a href="#!" className={style.link}>
      <img className={style.logo} src={logoSrc} alt="logo" />
    </a>
  );
};
