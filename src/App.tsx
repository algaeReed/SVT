import { Layout } from "antd";
import { Header, Content, Footer } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import Menu from "./layout/menu/Menu";
import Main from "./layout/main/Main";
import { useState } from "react";

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
};

//通过设置header的高度，来设置footer的高度

function App() {
  const [notification, SetNotification] = useState<boolean>(false);

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
            <Main />
            {/* {notification} */}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
