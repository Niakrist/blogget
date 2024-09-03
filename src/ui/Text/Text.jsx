import style from "./Text.module.css";
import cn from "classnames";
import PropTypes from "prop-types";
export const Text = (prop) => {
  const {
    As = "span",
    color = "black",
    size,
    tsize,
    dsize,
    className,
    children,
    href,
    center,
    medium,
    bold,
    onClick,
  } = prop;
  return (
    <As
      href={href}
      onClick={onClick}
      className={cn(
        className,
        style[color],
        { [style.medium]: medium },
        { [style.bold]: bold },
        { [style.center]: center },
        { [style[`fs${size}`]]: size },
        { [style[`fst${tsize}`]]: tsize },
        { [style[`fsd${dsize}`]]: dsize }
      )}
    >
      {children}
    </As>
  );
};

Text.propsType = {
  color: PropTypes.string,
  size: PropTypes.number,
  tsize: PropTypes.number,
  dsize: PropTypes.number,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
  ]),
  center: PropTypes.bool,
  href: PropTypes.string,
  medium: PropTypes.bool,
  bold: PropTypes.bool,
  onClick: PropTypes.func,
};
