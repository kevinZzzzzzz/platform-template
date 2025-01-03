import React, { useEffect, useRef, useState } from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import {
  flattenMenuList,
  flattenTabsList,
  MenuInitList,
  updateRouter,
} from "@/router";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./index.module.scss";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  // changeActivePath,
  changeActiveTabKey,
  changeHeaderTabList,
  changeMenuKey,
} from "@/store/slice/LayoutSlice";
interface LevelKeysProps {
  key?: string;
  children?: LevelKeysProps[];
}

const MenuComp: React.FC = (props: any) => {
  const { headerTabList, menuKey, projectList } = useAppSelector(
    (store: any) => {
      return store.Layout;
    }
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const location = useLocation();
  const [menuList, setMenuList] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState(["0"]);
  const [stateOpenKeys, setStateOpenKeys] = useState(["0"]);
  const { pathname, search } = location;
  const isMounted = useRef(false);

  useEffect(() => {
    // updateRouter(projectList);
    window.NProgress?.start();
    if (!isMounted.current) {
      settingMenu(flattenTabsList, true);
    } else {
      // 切换路由时 更新父子级菜单的激活状态
      settingMenu(flattenTabsList);
    }
  }, [location]);

  useEffect(() => {
    setMenuList(MenuInitList.filter((d) => d.menukey === menuKey));
  }, [props.collapsed, menuKey]);

  /**
   * 初始化或者切换路由时, 保存menu组件的父子级菜单的激活状态
   * @params menu: 扁平后的菜单
   * @params isInit: 是否为初始化
   */
  function settingMenu(menu: any, isInit = false) {
    const activeItem = menu.find(
      (d: any) => d.path == pathname || d.path == `${pathname}${search}`
    );
    if (activeItem) {
      setSelectedKeys(() => [activeItem.key]);
      setStateOpenKeys(() =>
        activeItem.fatherId ? [...activeItem.fatherId] : ["1"]
      );
      const obj = {
        label: t(activeItem.label || activeItem.name),
        key: activeItem.key,
        path: activeItem.path,
        menuKey: activeItem.menukey,
      };
      const newHeaderTabList = JSON.parse(JSON.stringify(headerTabList));
      if (isInit) {
        // 初始化更新headerTabs
        if (!newHeaderTabList.length) {
          dispatch(
            changeHeaderTabList({
              headerTabList: [{ ...obj }],
            })
          );
          dispatch(changeMenuKey({ menuKey: obj.menuKey }));
        }
        isMounted.current = true;
      } else {
        // 先判断是否已打开过
        const isExist = newHeaderTabList.find((a) => a.key == obj.key);
        if (!isExist) {
          const item = {
            label: obj.label,
            key: obj.key,
            path: obj.path,
            menuKey: obj.menuKey,
          };
          newHeaderTabList.push(item);
          // 更新headerTab组件的数据
          dispatch(changeHeaderTabList({ headerTabList: newHeaderTabList }));
          dispatch(changeActiveTabKey({ activeTabKey: item.key }));
          dispatch(changeMenuKey({ menuKey: obj.menuKey }));
        }
      }
      // 每次路由跳转都要更新tabs激活状态
      dispatch(changeActiveTabKey({ activeTabKey: obj.key }));
      dispatch(changeMenuKey({ menuKey: obj.menuKey }));
    }
  }
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
    <div className={styles.menuComp}>
      <Menu
        onClick={onClick}
        onOpenChange={onOpenChange}
        mode="inline"
        openKeys={stateOpenKeys}
        selectedKeys={selectedKeys}
        // onOpenChange={onOpenChange}
        items={menuList.map((d) => {
          return {
            ...d,
            label: t(d.label || d.name),
          };
        })}
      />
    </div>
  );
};

export default MenuComp;
