import React, { useEffect, useState } from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { flattenMenuList, MenuInitList } from "@/router";
import { useNavigate, useLocation } from "react-router-dom";

interface LevelKeysProps {
  key?: string;
  children?: LevelKeysProps[];
}

const MenuComp: React.FC = (props: any) => {
  const navigate = useNavigate();
  const [menuList, setMenuList] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState(["0"]);
  const [stateOpenKeys, setStateOpenKeys] = useState(["0"]);

  useEffect(() => {
    setMenuList(MenuInitList);
    console.log("collapsed", flattenMenuList);
  }, [props.collapsed]);

  const onClick: MenuProps["onClick"] = (e: any) => {
    setSelectedKeys(() => [e.key]);
    const obj = flattenMenuList.find((d: any) => d.key == e.key);
    obj?.path && navigate(obj.path);
  };
  const onOpenChange = (openKeysTemp: string[]) => {
    if (openKeysTemp.length) {
      setStateOpenKeys(openKeysTemp);
    } else {
      setStateOpenKeys([]);
    }
  };
  return (
    <Menu
      onClick={onClick}
      onOpenChange={onOpenChange}
      mode="inline"
      openKeys={stateOpenKeys}
      selectedKeys={selectedKeys}
      // onOpenChange={onOpenChange}
      items={menuList}
    />
  );
};

export default MenuComp;
