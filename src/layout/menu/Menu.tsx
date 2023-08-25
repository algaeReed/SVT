import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";

function Menu() {
  const [searchStatus, SetSearchStatus] = useState<boolean>(false);

  const handleSearch = async (e: any) => {
    console.log(e);
    await invoke("start_scan");
  };
  return <div className="menu">menu</div>;
}

export default Menu;
