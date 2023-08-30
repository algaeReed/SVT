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
type MenuItem = Required<MenuProps>["items"][number];

const MenuSide: React.FC = ({}) => {
  const navigate = useNavigate();

  function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group"
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }

  const items: MenuItem[] = [
    getItem("扫描", "sub1", <SecurityScanOutlined />, [
      getItem(
        "Item 1",
        null,
        null,
        [getItem("Option 1", "1"), getItem("Option 2", "2")],
        "group"
      ),
      getItem(
        "Item 2",
        null,
        null,
        [getItem("Option 3", "3"), getItem("Option 4", "4")],
        "group"
      ),
    ]),

    getItem("Navigation Two", "sub2", <AppstoreOutlined />, [
      getItem("Option 5", "5"),
      getItem("Option 6", "6"),
      getItem("Submenu", "sub3", null, [
        getItem("Option 7", "7"),
        getItem("Option 8", "8"),
      ]),
    ]),

    getItem("设置", "sub4", <SettingOutlined />, [
      getItem("Option 9", "9"),
      getItem("Option 10", "10"),
      getItem("Option 11", "11"),
      getItem("Option 12", "12"),
    ]),
  ];

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click", e);
    navigate("/about");
  };

  return (
    <div className="menu">
      {/* <Image width={200} /> */}
      <Menu
        onClick={onClick}
        // style={{ width: 256 }}
        mode="vertical"
        items={items}
      />

      {/* <Link to="/">扫描</Link>
      <Link to="/about">关于</Link>
      <Link to="/setting">设置</Link> */}
    </div>
  );
};

export default MenuSide;
