import React, { useState, useEffect, memo, useMemo } from "react";
import styles from "./index.module.scss";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
  DownOutlined,
  FontColorsOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  LogoutOutlined,
  MoonOutlined,
  SearchOutlined,
  SunOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  changeFullScreen,
  changeLocale,
  changeTheme,
  changeMenuKey,
} from "@/store/slice/LayoutSlice";
import {
  Avatar,
  Button,
  Dropdown,
  MenuProps,
  Space,
  Tabs,
  Tooltip,
} from "antd";
import { LocaleList } from "@/constants/theme";
import { HEADER_MENU_TABS } from "@/router/imports";
import IconComp from "../Icon";
function HeaderComp(props: any) {
  const dispatch = useAppDispatch();
  const { theme, fullScreen, locale, menuKey } = useAppSelector(
    (store: any) => {
      return store.Layout;
    }
  );
  const LangItems: MenuProps["items"] = LocaleList.map((d) => {
    return {
      label: (
        <a
          onClick={() => {
            dispatch(changeLocale({ locale: d.value }));
          }}
        >
          {d.label}
        </a>
      ),
      key: d.key,
    };
  });
  const AvatarSettingItems: MenuProps["items"] = [
    {
      label: (
        <div className={styles.settingItem}>
          <UserOutlined />
          <p className={styles.settingItem_title}>个人中心</p>
        </div>
      ),
      key: "1",
    },
    {
      label: (
        <div className={styles.settingItem}>
          <LogoutOutlined />
          <p className={styles.settingItem_title}>退出登录</p>
        </div>
      ),
      key: "2",
    },
  ];
  /** 全屏 */
  const setFullScreen = () => {
    dispatch(changeFullScreen({ fullScreen: !fullScreen }));
  };
  /** 主题 */
  const setTheme = () => {
    dispatch(changeTheme({ theme: theme === "dark" ? "light" : "dark" }));
  };
  /** 顶部菜单 */
  const headerTabsItem = useMemo(() => {
    return HEADER_MENU_TABS.map((d, idx) => {
      return {
        label: d.title,
        icon: IconComp(d.icon),
        key: d.key,
        path: d.path,
      };
    });
  }, []);

  // 切换tabs
  const handleTabClick = (e: string) => {
    dispatch(changeMenuKey({ menuKey: e }));
  };
  return (
    <div className={styles.HeaderComp}>
      <div className={styles.HeaderComp_leftCtx}>
        <Tabs
          defaultActiveKey={menuKey}
          activeKey={menuKey}
          items={headerTabsItem}
          onTabClick={handleTabClick}
        />
      </div>
      <div className={styles.HeaderComp_rightCtx}>
        <div className={styles.HeaderComp_rightCtx_item}>
          <Tooltip placement="bottom" title={"搜索"}>
            <SearchOutlined />
          </Tooltip>
        </div>
        <div
          className={styles.HeaderComp_rightCtx_item}
          onClick={() => {
            setFullScreen();
          }}
        >
          <Tooltip placement="bottom" title={fullScreen ? "退出全屏" : "全屏"}>
            {fullScreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
          </Tooltip>
        </div>
        <div
          className={styles.HeaderComp_rightCtx_item}
          onClick={() => {
            setTheme();
          }}
        >
          <Tooltip placement="bottom" title={"切换主题"}>
            {theme === "dark" ? <MoonOutlined /> : <SunOutlined />}
          </Tooltip>
        </div>
        <div className={styles.HeaderComp_rightCtx_item}>
          <Tooltip placement="left" title={"切换语言"}>
            <Dropdown arrow menu={{ items: LangItems }} placement="bottom">
              <FontColorsOutlined />
            </Dropdown>
          </Tooltip>
        </div>
        <div className={styles.HeaderComp_rightCtx_item}>
          <Dropdown
            arrow
            menu={{ items: AvatarSettingItems }}
            placement="bottom"
          >
            <div className={styles.HeaderComp_rightCtx_item_avatar}>
              <Avatar size={24} icon={<UserOutlined />} />
              <p className={styles.HeaderComp_rightCtx_item_avatar_name}>
                Kevinzzzzzzzzzzz
              </p>
            </div>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}
export default memo(HeaderComp);
