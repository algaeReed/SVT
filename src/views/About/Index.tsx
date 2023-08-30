import React from "react";
import { Image } from "antd";
const SearchResultStyle: React.CSSProperties = {
  color: "black",
  height: "100%",
  width: "100%",
  border: "1px solid red",
};
import logo from "../../assets/logo.jpg";

import copyright from "../../assets/copyright.png";
const About: React.FC = ({}) => {
  return (
    <div style={SearchResultStyle}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",

          marginTop: "50%",
          marginLeft: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Image src={logo} width={80} preview={false} />

        <Image src={copyright} width={185} preview={false} />
      </div>
    </div>
  );
};

export default About;
