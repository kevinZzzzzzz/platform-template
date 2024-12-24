import BaseLayout from "@/layout/base";
import BlankLayout from "@/layout/blank";
import { lazy } from "react";
import NProgress from "nprogress";

// 页面路径前缀
export const VIEW_PREFIX = "pages.";
// 布局路径前缀
export const LAYOUT_PREFIX = "layout.";

/**
 * 布局映射
 */
export const LAYOUT_NAME_MAP = {
  base: BaseLayout,
  blank: BlankLayout,
};

/**
 * 顶部菜单Tabs 列表
 */
export const HEADER_MENU_TABS = [
  {
    key: "1",
    title: "菜单一",
    path: "/home",
    icon: "BarChartOutlined",
  },
  {
    key: "2",
    title: "菜单二",
    path: "/home2",
    icon: "LineChartOutlined",
  },
];
/**
 * 页面路径映射
 */
export const ROUTER_NAME_TO_PAGES_MAP = {
  home: lazy(() => import(/* webpackChunkName: "home" */ "@/pages/home/index")),
  about: lazy(
    () => import(/* webpackChunkName: "about" */ "@/pages/about/index")
  ),
  login: lazy(
    () => import(/* webpackChunkName: "login" */ "@/pages/login/index")
  ),
  "exception.403": lazy(
    () => import(/* webpackChunkName: "403" */ "@/pages/exception/403")
  ),
  "exception.404": lazy(
    () => import(/* webpackChunkName: "404" */ "@/pages/exception/404")
  ),
  "exception.500": lazy(
    () => import(/* webpackChunkName: "500" */ "@/pages/exception/500")
  ),
  table: lazy(
    () => import(/* webpackChunkName: "table" */ "@/pages/table/index")
  ),
  form: lazy(() => import(/* webpackChunkName: "form" */ "@/pages/form/index")),
  embedPage: lazy(
    () => import(/* webpackChunkName: "embedPage" */ "@/pages/embedPage/index")
  ),
  extendedPage: lazy(
    () =>
      import(
        /* webpackChunkName: "extendedPage" */ "@/pages/extendedPage/index"
      )
  ),
};
/** Setup plugin NProgress */
export function setupNProgress() {
  NProgress.configure({
    easing: "ease",
    speed: 500,
  });

  // mount on window
  window.NProgress = NProgress;
}
