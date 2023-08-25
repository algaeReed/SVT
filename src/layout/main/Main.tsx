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
  fontSize: "64px",
  color: "#7dbcea",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

function Main() {
  const [searchStatus, SetSearchStatus] = useState<boolean>(false);

  const handleSearch = async (e: any) => {
    console.log(e);
    await invoke("start_scan");
  };
  return (
    <div style={mainStyle}>
      <div style={titleStyle}>Welcome to SVT!</div>
      <Search
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
