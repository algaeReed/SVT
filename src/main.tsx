import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import Router from "./routes/";
import { ConfigProvider } from "antd";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* <App />*/}
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#95b9e2",
        },
      }}
    >
      <Router />
    </ConfigProvider>
  </React.StrictMode>
);
