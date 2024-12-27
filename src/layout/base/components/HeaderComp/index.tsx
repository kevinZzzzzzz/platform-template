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
  DownloadOutlined,
  SunOutlined,
  UserOutlined,
  BgColorsOutlined,
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
  Modal,
  Dropdown,
  MenuProps,
  Space,
  Tabs,
  Tooltip,
  Drawer,
} from "antd";
import { LocaleList } from "@/constants/theme";
import { HEADER_MENU_TABS } from "@/router/imports";
import IconComp from "../Icon";
import { useNavigate } from "react-router-dom";
import DownLoadDialogComp from "./DownLoadDialog";
import ThemeSetting from "./ThemeSetting";
function HeaderComp(props: any) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { theme, fullScreen, locale, menuKey } = useAppSelector(
    (store: any) => {
      return store.Layout;
    }
  );
  const [modelType, setModelType] = useState("");
  const [openModel, setOpenModel] = useState(false);
  const [openThemeSetting, setOpenThemeSetting] = useState(false);
  const modelTypeMap = {
    // 弹窗类型
    DownLoad: {
      width: "45%",
      comp: () => <DownLoadDialogComp />,
    },
  };
  const ModelComp = useMemo(() => {
    return modelTypeMap[modelType]?.comp || null;
  }, [modelType]);

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
        <div
          className={styles.settingItem}
          onClick={() => {
            navigate("/login");
          }}
        >
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
        label: <span style={{ fontSize: "16px" }}>{d.title}</span>,
        icon: IconComp(d.icon, {
          style: { fontSize: "20px", fontWeight: "600" },
        }),
        key: d.key,
        path: d.path,
      };
    });
  }, []);

  // 切换tabs
  const handleTabClick = (e: string) => {
    dispatch(changeMenuKey({ menuKey: e }));
  };

  const handleModelOpen = (type) => {
    setOpenModel(true);
    setModelType(type);
  };
  const handleModelClose = () => {
    setOpenModel(false);
    setModelType("");
  };

  const onOpenThemeSetting = () => {
    setOpenThemeSetting(true);
  };
  const onCloseThemeSetting = () => {
    setOpenThemeSetting(false);
  };
  useEffect(() => {
    window.$busInc.on("handleModel", (args) => {
      setOpenModel(args.visible);
    });
  }, []);
  return (
    <div className={styles.HeaderComp}>
      <div className={styles.HeaderComp_leftCtx}>
        <Tabs
          type={"card"}
          defaultActiveKey={menuKey}
          activeKey={menuKey}
          items={headerTabsItem}
          onTabClick={handleTabClick}
        />
      </div>
      <div className={styles.HeaderComp_rightCtx}>
        <div className={styles.HeaderComp_rightCtx_item}>
          <Tooltip placement="bottom" title={"下载"}>
            <DownloadOutlined onClick={() => handleModelOpen("DownLoad")} />
          </Tooltip>
        </div>
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
        <div
          className={styles.HeaderComp_rightCtx_item}
          onClick={() => {
            onOpenThemeSetting();
          }}
        >
          <Tooltip placement="bottom" title={"主题配置"}>
            <BgColorsOutlined />
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
      <Modal
        width={modelTypeMap[modelType]?.width}
        onCancel={handleModelClose}
        open={openModel}
        footer={null}
        destroyOnClose={true}
        closable={false}
      >
        {ModelComp ? <ModelComp /> : null}
      </Modal>
      <Drawer
        title="主题配置"
        onClose={onCloseThemeSetting}
        open={openThemeSetting}
      >
        <ThemeSetting />
      </Drawer>
    </div>
  );
}
export default memo(HeaderComp);
