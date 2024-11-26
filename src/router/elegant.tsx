import {
  LAYOUT_NAME_MAP,
  LAYOUT_PREFIX,
  ROUTER_NAME_TO_PAGES_MAP,
  VIEW_PREFIX,
} from "./imports";
import KeepAlive, { AliveScope } from "react-activation";

/**
 * 处理路由组件，根据页面路径获取页面组件
 * @param component 页面路径
 */
export const handleRouteComponent = (component: string) => {
  if (!component) {
    return <></>;
  }
  const pageName = component.replace(VIEW_PREFIX, "");
  if (!ROUTER_NAME_TO_PAGES_MAP[pageName]) {
    throw new Error(`Page ${pageName} not found`);
  }
  return ROUTER_NAME_TO_PAGES_MAP[pageName];
};
/**
 * 处理布局组件
 * @param layout 布局名称
 */
export const handleLayoutComponent = (layout) => {
  if (!layout) {
    return null;
  }
  const layoutName = layout.replace(LAYOUT_PREFIX, "");
  if (!LAYOUT_NAME_MAP[layoutName]) {
    throw new Error(`Layout ${layoutName} not found`);
  }
  return LAYOUT_NAME_MAP[layoutName];
};
/**
 * 处理路由
 * @param routesList 路由表
 * @returns
 */
export const handledRoutes = (routesList: GeneratedRoute[]) => {
  if (!routesList) {
    return [];
  }
  const result: GeneratedRoute[] = [];
  routesList.forEach((route) => {
    const item = {
      ...route,
      layout: handleLayoutComponent(route.layout),
      component: handleRouteComponent(route.component),
      children: handledRoutes(route.children),
    };
    result.push(item);
  });
  return result;
};

/**
 *扁平化处理路由
 * @param routerData 路由表
 */
export function handleFlattenRoutes(routerData: GeneratedRoute[]) {
  return routerData.reduce((prev, next) => {
    return prev.concat(
      next.children && next.children.length
        ? handleFlattenRoutes(next.children)
        : {
            ...next,
          }
    );
  }, []);
}
