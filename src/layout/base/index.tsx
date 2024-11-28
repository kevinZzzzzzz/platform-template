import React, { PureComponent } from "react";
import styles from "./index.module.scss";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { ConfigProvider, Layout, Menu, Tabs, theme } from "antd";
import { changeCollapsed } from "@/store/slice/LayoutSlice";
import "dayjs/locale/zh-cn";
import locale from "antd/locale/zh_CN";
import MenuComp from "./components/MenuComp";

const { Header, Content, Footer, Sider } = Layout;

const BaseLayout = ({ children, ...props }) => {
  const dispatch = useAppDispatch();
  const { theme, collapsed, header, content, tab, sider, footer } =
    useAppSelector((store: any) => {
      return store.Layout;
    });
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        style={sider}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => dispatch(changeCollapsed({ collapsed: value }))}
      >
        <div className={styles.sider}>
          <div className={styles.sider_logo}></div>
        </div>
        <MenuComp />
      </Sider>
      <Layout>
        <Header style={{ ...header }} />
        <Tabs
          hideAdd
          type="editable-card"
          items={[]}
          tabBarStyle={{ ...tab }}
        />
        <Content style={{ ...content }}>
          <div className={styles.main__context}>{children}</div>
        </Content>
        <Footer style={{ ...footer }}></Footer>
      </Layout>
    </Layout>
  );
};
export default React.memo(BaseLayout);
