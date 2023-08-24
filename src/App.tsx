import { KeyboardEvent, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.scss";
import { Button, Input } from 'antd';
const { Search } = Input;


function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  const [searchStatus,SetSearchStatus] = useState<boolean>(false)

  async function greet() {
    setGreetMsg(await invoke("greet", { name }));
  }


  const handleSearch  =async (e: any) => { 
    console.log(e)
    await invoke("start_scan");
  }
  return (
    <div className="container">
      <h1>Welcome to SVT!</h1>
      
      <div className="search">
        {/* enter domain or ip... */}
        <Search placeholder="..." enterButton="查询" size="large" loading={searchStatus} onSearch={(e) => { handleSearch(e)}}  />
        
    </div>

    </div>
  );
}

export default App;
