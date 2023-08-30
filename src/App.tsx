import { Layout } from "antd";
import { Header, Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import Menu from "./layout/MenuSide/MenuSide";
import Main from "./layout/Main/Main";
import { useState } from "react";

import { Link, Outlet } from "react-router-dom";

const appStyle: React.CSSProperties = {
  backgroundColor: "#d4d9dd",
  background: "red",
};

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: 50,
  lineHeight: "64px",
  backgroundColor: "#ffffff",
  border: "1px solid red",
};

const siderStyle: React.CSSProperties = {
  height: "calc(100vh - 50px)",
  color: "#fff",
  backgroundColor: "#ffffff",
  border: "1px solid red",
};

const contentStyle: React.CSSProperties = {
  height: "calc(100vh - 50px)",
  color: "#fff",
  backgroundColor: "#ffffff",
  overflow: "hidden",
};

//通过设置header的高度，来设置footer的高度

const App: React.FC = ({}) => {
  const [notification, _SetNotification] = useState<boolean>(false);

  return (
    <div style={appStyle}>
      <Layout>
        {notification && <Header style={headerStyle}>Header</Header>}
        <Layout hasSider>
          <Sider
            collapsible={true}
            style={
              notification
                ? siderStyle
                : {
                    ...siderStyle,
                    height: "100vh",
                  }
            }
            width={300}
          >
            <Menu />
          </Sider>
          <Content
            style={
              notification
                ? contentStyle
                : {
                    ...contentStyle,
                    height: "100vh",
                  }
            }
          >
            22
            <Outlet />
            {/* <Main /> */}
            {/* {notification} */}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default App;
