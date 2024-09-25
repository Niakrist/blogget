import React from "react";

import { PuffLoader } from "react-spinners";

const Preloader = ({ size }) => {
  return <PuffLoader color="#cc6633" css={{ display: "block" }} size={size} />;
};

export default Preloader;
