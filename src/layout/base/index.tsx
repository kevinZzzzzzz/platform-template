import React, { PureComponent } from "react";
import styles from "./index.module.scss";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { ConfigProvider, Layout, theme } from "antd";
import { changeCollapsed } from "@/store/slice/LayoutSlice";
import "dayjs/locale/zh-cn";
import locale from "antd/locale/zh_CN";

const { Header, Content, Footer, Sider } = Layout;

const BaseLayout = ({ children, ...props }) => {
  console.log(children);
  const dispatch = useAppDispatch();
  const { theme, collapsed, header, content, tab, sider, footer } =
    useAppSelector((store: any) => {
      return store.Layout;
    });
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        style={{ ...sider }}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => dispatch(changeCollapsed({ collapsed: value }))}
      >
        <div className="demo-logo-vertical" />
        {/* <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        /> */}
      </Sider>
      <Layout>
        <Header style={{ ...header }} />
        <Content style={{ ...content }}>
          <div className={styles.main__context}>{children}</div>
        </Content>
        <Footer style={{ ...footer }}></Footer>
      </Layout>
    </Layout>
  );
};
export default React.memo(BaseLayout);
