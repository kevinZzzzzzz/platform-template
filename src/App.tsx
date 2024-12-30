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
import { Spin, ConfigProvider, theme as Theme, message } from "antd";
import "dayjs/locale/zh-cn";
// import locale from "antd/locale/zh_CN";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
// import { AntdStyle, AntdTokenStyleMap, ColorByTheme } from "./constants/theme";
import "@/locales/config";
import { useTranslation, Trans } from "react-i18next";
import { setupNProgress } from "./router/imports";
import zhCN from "antd/locale/zh_CN";
import enUS from "antd/locale/en_US";
import { Bus } from "./utils/Bus";
import { importPlugin } from "./utils";
// import { sleep } from "./utils";
// import { Bus } from "js-tools-xxx";

setupNProgress();
declare global {
  interface Window {
    $api: any;
    NProgress: any;
    $busInc: any;
    $plugins: any;
  }
}
/* 
  设置全局变量
*/
window.$api = { ...api };
!window.$busInc && (window.$busInc = new Bus()); // 事件总线

// 插件全局拦截
window.$plugins = new Proxy(
  {},
  {
    get(target, key) {
      if (!Reflect.has(target, key)) {
        message.warning("请先至插件市场下载插件～～～");
        return false;
      }
      return Reflect.get(target, key);
    },
  }
);
function App() {
  const { t, i18n } = useTranslation();
  const {
    greyMode,
    colorWeaknessMode,
    ColorByTheme,
    AntdStyle,
    AntdTokenStyleMap,
    AntdTokenStyle,
  } = useAppSelector((store) => {
    return store.Theme;
  });
  const { theme, locale, pluginList } = useAppSelector((store) => {
    return store.Layout;
  });

  useEffect(() => {
    // 安装插件
    pluginList.forEach((item) => {
      importPlugin(item.key);
    });
  }, []);
  // const [routesList, setRoutesList] = useState(routes);
  useEffect(() => {
    // updateRouter(projectList);
    // setRoutesList(updateFlattenRoutes(routes));

    window.NProgress?.start();
    window.NProgress?.done();
    i18n.changeLanguage(locale);
  }, [locale]);
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    if (greyMode && colorWeaknessMode) {
      document.documentElement.setAttribute("data-color-mode", "grey-and-weak");
    } else if (greyMode && !colorWeaknessMode) {
      document.documentElement.setAttribute("data-color-mode", "grey");
    } else if (!greyMode && colorWeaknessMode) {
      document.documentElement.setAttribute("data-color-mode", "weak");
    } else {
      document.documentElement.setAttribute("data-color-mode", "none");
    }
  }, [theme, greyMode, colorWeaknessMode]);

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
        token: {
          ...(AntdTokenStyleMap[theme] as any),
          ...AntdTokenStyle,
        },
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
