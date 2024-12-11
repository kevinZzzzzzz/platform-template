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

const { Header, Content, Footer, Sider } = Layout;

const BaseLayout = ({ children, ...props }) => {
  const dispatch = useAppDispatch();
  const [isEditMode, setIsEditMode] = useState(false);
  useEffect(() => {
    window.$busInc.on("changeMode", (args) => {
      setIsEditMode(args.isEditMode);
      setTimeout(() => {
        window.NProgress?.done();
      }, 1000);
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
    <>
      {/* {isEditMode ? (
        <EditMode />
      ) : (
        <Layout style={{ minHeight: "100vh" }}>
          <Sider
            style={sider}
            collapsible
            breakpoint={sider.breakpoint}
            collapsed={collapsed}
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
      )} */}
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Sider
          style={sider}
          collapsible
          breakpoint={sider.breakpoint}
          collapsed={collapsed}
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
      {/* {isEditMode ? <EditMode /> : null} */}
      {/* <EditMode style={{ visibility: !isEditMode ? "visible" : "hidden" }} /> */}
    </>
  );
};
export default React.memo(BaseLayout);
