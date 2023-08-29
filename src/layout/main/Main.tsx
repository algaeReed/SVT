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
function Main() {
  const [searchStatus, _SetSearchStatus] = useState<boolean>(false);

  const handleSearch = async (e: any) => {
    console.log(e);
    await invoke("start_scan");
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
      <SearchResult />
    </div>
  );
}

export default Main;
