import type { MenuProps } from "antd";
import { Menu, Image } from "antd";

import { SettingOutlined, SecurityScanOutlined } from "@ant-design/icons";
import Router from "../../routes";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
type MenuItem = Required<MenuProps>["items"][number];
import logo from "../../assets/logo.jpg";
const MenuSide: React.FC = ({}) => {
  const menuSideStyle: React.CSSProperties = {
    // border: "1px solid red",
  };
  const [current, setCurrent] = useState("/");

  const navigate = useNavigate();

  const items: MenuItem[] = [
    {
      label: "扫描",
      key: "/",

      icon: <SecurityScanOutlined />,
    },
    {
      label: "关于",
      key: "about",
      icon: <SecurityScanOutlined />,
    },
    {
      label: "设置",
      key: "setting",
      icon: <SettingOutlined />,
    },
  ];

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click", e);
    navigate(e.keyPath[0]);
    setCurrent(e.key);
  };

  return (
    <div style={menuSideStyle}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "10px auto",
        }}
      >
        <Image width={76} src={logo} preview={false} />
      </div>
      <Menu
        selectedKeys={[current]}
        onSelect={onClick}
        // style={{ width: 256 }}
        mode="vertical"
        items={items}
      />
    </div>
  );
};

export default MenuSide;
