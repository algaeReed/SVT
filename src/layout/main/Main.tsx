import React, { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import Search from "antd/es/input/Search";
import SearchResult from "../../views/SearchResult/Index";
import { message } from "antd";

const mainStyle: React.CSSProperties = {
  width: "90%",
  margin: "auto",
  padding: "10px",
  height: "100%",
};
const titleStyle: React.CSSProperties = {
  height: "20vh",
  lineHeight: "80px",
  fontSize: "64px",
  color: "#7dbcea",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const searchStyle: React.CSSProperties = {
  width: "80%",
  marginLeft: "10%",
  marginRight: "10%",
};
const Main: React.FC = ({}) => {
  const [searchStatus, _SetSearchStatus] = useState<boolean>(false);
  //定义c段 使用usestate
  const [c_segment, SetCSegment] = useState<[]>([]);

  // Check if it is in IP format
  const isIP = (ip: string) => {
    var reg = new RegExp(
      "^((25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(25[0-5]|2[0-4]\\d|[01]?\\d\\d?)$"
    );
    return reg.test(ip);
  };

  // Check if it is in domain format
  const isDomain = (domain: string) => {
    const domainSuffixes = ["com", "net", "org", "gov", "edu", "mil", "int"];
    const domainParts = domain.split(".");
    const domainSuffix = domainParts[domainParts.length - 1];
    if (domainSuffixes.includes(domainSuffix)) {
      return true;
    } else {
      console.log("Unsupported domain suffix");
      return false;
    }
  };

  const handleSearch = async (target: any) => {
    console.log(target);
    if (isIP(target)) {
      //定义C段
      const c_segment_ret: [] = await invoke("start_scan", {
        target,
      });
      SetCSegment(c_segment_ret);
      console.log(c_segment_ret);
    } else if (isDomain(target)) {
      message.success("域名");
    } else {
      message.error("不支持此格式🙅");
    }
  };
  return (
    <div style={mainStyle}>
      <div style={titleStyle}>Welcome to SVT!</div>
      <Search
        style={searchStyle}
        placeholder="..."
        enterButton="查询"
        size="large"
        loading={searchStatus}
        onSearch={(e) => {
          handleSearch(e);
        }}
      />
      <SearchResult cSegment={c_segment} />
    </div>
  );
};

export default Main;
