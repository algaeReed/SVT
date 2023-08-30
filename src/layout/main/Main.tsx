import React, { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import Search from "antd/es/input/Search";
import SearchResult from "../../components/SearchResult/SearchResult";

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

  const handleSearch = async (e: any) => {
    console.log(e);
    //定义C段
    const c_segment_ret: [] = await invoke("start_scan", {
      target: "220.181.172.99",
    });
    SetCSegment(c_segment_ret);
    console.log(c_segment_ret);
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
