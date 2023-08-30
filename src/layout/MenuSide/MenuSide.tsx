import type { MenuProps } from "antd";
import { Menu } from "antd";

import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  SecurityScanOutlined,
} from "@ant-design/icons";
import Router from "../../routes";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
type MenuItem = Required<MenuProps>["items"][number];

const MenuSide: React.FC = ({}) => {
  const [current, setCurrent] = useState("mail");

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
  };

  return (
    <div className="menu">
      {/* <Image width={200} /> */}
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
