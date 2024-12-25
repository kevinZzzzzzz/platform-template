import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import {
  flattenRoutes as routes,
  // updateFlattenRoutes,
  // updateRouter,
} from "./router/index";
import api from "@/api";
import { AliveScope } from "react-activation";
import KeepAliveComp from "@/components/KeepAliveComp";
import LoadingComp from "./components/Loading";
import { Spin, ConfigProvider, theme as Theme } from "antd";
import "dayjs/locale/zh-cn";
// import locale from "antd/locale/zh_CN";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { AntdStyle, AntdTokenStyleMap, ColorByTheme } from "./constants/theme";
import "@/locales/config";
import { useTranslation, Trans } from "react-i18next";
import { setupNProgress } from "./router/imports";
import zhCN from "antd/locale/zh_CN";
import enUS from "antd/locale/en_US";
import { Bus } from "./utils/Bus";
// import { sleep } from "./utils";
// import { Bus } from "js-tools-xxx";

setupNProgress();
declare global {
  interface Window {
    $api: any;
    NProgress: any;
    $busInc: any;
  }
}
/* 
  设置全局变量
*/
window.$api = { ...api };
!window.$busInc && (window.$busInc = new Bus()); // 事件总线

function App() {
  const { t, i18n } = useTranslation();
  const { theme, locale, projectList } = useAppSelector((store) => {
    return store.Layout;
  });
  // const [routesList, setRoutesList] = useState(routes);
  useEffect(() => {
    // updateRouter(projectList);
    // setRoutesList(updateFlattenRoutes(routes));

    window.NProgress?.start();
    window.NProgress?.done();
    i18n.changeLanguage(locale);
  }, [locale]);
  return (
    <ConfigProvider
      locale={locale === "zh" ? zhCN : enUS}
      theme={{
        algorithm:
          theme === "light" ? Theme.defaultAlgorithm : Theme.darkAlgorithm,
        components: {
          Layout: {
            headerBg: ColorByTheme[theme]["headerBg"],
            siderBg: ColorByTheme[theme]["siderBg"],
            footerBg: ColorByTheme[theme]["footerBg"],
            triggerBg: ColorByTheme[theme]["triggerBg"],
            triggerColor: ColorByTheme[theme]["triggerColor"],
            triggerHeight: ColorByTheme[theme]["triggerHeight"],
          },
          ...AntdStyle,
          Tabs: {
            cardBg: ColorByTheme[theme]["tabsCardBg"],
            // ...AntdStyle?.Tabs,
          },
          //
          Menu: AntdStyle?.Menu[theme],
        },
        token: AntdTokenStyleMap[theme] as any,
      }}
      // locale={locale}
    >
      <BrowserRouter>
        <AliveScope>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />}></Route>
            {routes?.map((e: any) => {
              return (
                <Route
                  key={e.key}
                  path={e.path}
                  element={
                    <e.layout>
                      <Suspense fallback={<LoadingComp></LoadingComp>}>
                        <KeepAliveComp {...e}></KeepAliveComp>
                      </Suspense>
                    </e.layout>
                  }
                ></Route>
              );
            })}
            <Route path="/*" element={<Navigate to="/exception/404" />}></Route>
          </Routes>
        </AliveScope>
      </BrowserRouter>
    </ConfigProvider>
  );
}
export default App;
