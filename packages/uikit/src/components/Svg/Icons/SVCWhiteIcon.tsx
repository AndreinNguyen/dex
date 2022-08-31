import React from "react";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (prop) => {
  return (
    <img
      {...prop}
      style={{ marginRight: "8px" }}
      width={20}
      height={20}
      alt="Savvycoin logo"
      src="./images/tokens/SVC.png"
    />
  );
};

export default Icon;
