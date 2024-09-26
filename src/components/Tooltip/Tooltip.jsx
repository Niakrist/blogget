import React from "react";
import ReactDOM from "react-dom";
import { ReactComponent as ErrorIcon } from "./icon/error.svg";

import style from "./Tooltip.module.css";

const Tooltip = ({ error, subject, bottom }) => {
  console.log("error:", error);
  return ReactDOM.createPortal(
    <div
      className={`${style.wrapper} ${error && style.error}`}
      style={{ bottom: bottom }}
    >
      <div className={style.btnError}>
        <ErrorIcon />
      </div>
      <div>
        <h3 className={style.title}>{subject}</h3>
        <p className={style.text}>{error}</p>
      </div>
    </div>,
    document.getElementById("tooltip-root")
  );
};

export default Tooltip;
