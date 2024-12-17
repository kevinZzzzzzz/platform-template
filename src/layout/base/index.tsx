import React, { PureComponent, useEffect, useState } from "react";
import styles from "./index.module.scss";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { Card, ConfigProvider, Layout, Menu, Tabs, theme } from "antd";
import { changeActiveTabKey, changeCollapsed } from "@/store/slice/LayoutSlice";
import "dayjs/locale/zh-cn";
import locale from "antd/locale/zh_CN";
import MenuComp from "./components/MenuComp";
import HeaderComp from "./components/HeaderComp";
import TabsComp from "./components/TabsComp";
import EditMode from "@/components/EditMode";
import { LeftOutlined, RightOutlined, SlackOutlined } from "@ant-design/icons";
import pkg from "../../../package.json";
console.log(pkg);

const { Header, Content, Footer, Sider } = Layout;

const BaseLayout = ({ children, ...props }) => {
  const dispatch = useAppDispatch();
  const [isEditMode, setIsEditMode] = useState({
    show: false,
    title: "",
    compName: "",
  });
  useEffect(() => {
    window.$busInc.on("changeMode", (args) => {
      console.log("args", args);
      setIsEditMode({
        ...args,
      });
      // setTimeout(() => {
      //   window.NProgress?.done();
      // }, 1000);
    });
  }, []);
  const {
    theme,
    collapsed,
    header,
    content,
    tab,
    sider,
    footer,
    headerTabList,
    activeTabKey,
  } = useAppSelector((store: any) => {
    return store.Layout;
  });
  return (
    <div className={styles.main}>
      <Layout
        id="baseLayout"
        style={{
          minHeight: isEditMode.show ? "0vh" : "100vh",
          maxHeight: isEditMode.show ? "0vh" : "100vh",
        }}
      >
        <Sider
          style={sider}
          collapsible
          breakpoint={sider.breakpoint}
          collapsed={collapsed}
          trigger={<SiderTrigger collapsed={collapsed} />}
          onCollapse={(value) =>
            dispatch(changeCollapsed({ collapsed: value }))
          }
        >
          <div className={styles.sider}>
            <div className={styles.sider_logo}></div>
          </div>
          <MenuComp />
        </Sider>
        <Layout>
          <Header style={{ ...header }}>
            <HeaderComp />
          </Header>
          <TabsComp />
          <Content
            style={{
              ...content,
              padding: "var(--layout-content-out-padding)",
            }}
          >
            <div
              className={styles.context}
              style={{
                backgroundColor: theme === "light" ? "#fff" : "#141414",
              }}
            >
              {children}
            </div>
          </Content>
          <Footer style={{ ...footer }}></Footer>
        </Layout>
      </Layout>
      <div
        style={{
          minHeight: isEditMode.show ? "100vh" : "0vh",
          maxHeight: isEditMode.show ? "100vh" : "0vh",
        }}
      >
        <EditMode isEditModeInfo={isEditMode} />
      </div>
    </div>
  );
};
export default React.memo(BaseLayout);
const SiderTrigger = React.memo((props: any) => {
  const { collapsed } = props;
  return (
    <div className={styles.trigger}>
      {collapsed ? (
        <RightOutlined />
      ) : (
        <div className={styles.trigger_main}>
          <SlackOutlined className={styles.trigger_main_version} spin={true} />
          <p>V{pkg.version}</p>
          <LeftOutlined />
        </div>
      )}
    </div>
  );
});
export const defaultGetContainer = () => {
  return document.getElementById("baseLayout");
};
