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
  } = prop;
  return (
    <As
      href={href}
      className={cn(
        className,
        style[color],
        { [style.center]: center },
        { [style[`fs${size}`]]: size },
        { [style[`fst${tsize}`]]: tsize },
        { [style[`fst${dsize}`]]: dsize }
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
};
