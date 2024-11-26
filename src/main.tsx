import React, { Suspense } from "react";
import { render } from "react-dom";
import App from "./App";
import "./index.scss";
import store from "./store";
import { Provider } from "react-redux";
import { Spin, ConfigProvider } from "antd";
import "dayjs/locale/zh-cn";
import locale from "antd/locale/zh_CN";

render(
  <Provider store={store}>
    <ConfigProvider locale={locale}>
      <App />
    </ConfigProvider>
  </Provider>,
  document.getElementById("root")
);
