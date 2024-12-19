import { generatedRoutes } from "@/router/routes";
import { handledRoutes, handleFlattenRoutes, initMenuList } from "./elegant";

// 路由信息表
let AllRouters: GeneratedRoute[] = handledRoutes(generatedRoutes);
// 扁平化路由信息
let flattenRoutes: GeneratedRoute[] = handleFlattenRoutes(AllRouters);

// 初始化菜单列表
let MenuInitList = initMenuList(generatedRoutes);
// 扁平化菜单列表
let flattenMenuList = handleFlattenRoutes(MenuInitList);

const updateRouter = (routers) => {
  const routersArr = [...generatedRoutes, ...routers];
  AllRouters = handledRoutes(routersArr);
  MenuInitList = initMenuList(routersArr);
  flattenRoutes = handleFlattenRoutes(AllRouters);
  flattenMenuList = handleFlattenRoutes(MenuInitList);
};

const updateFlattenRoutes = (routes) => {
  return [...flattenRoutes];
};
export {
  AllRouters,
  flattenRoutes,
  MenuInitList,
  flattenMenuList,
  updateRouter,
  updateFlattenRoutes,
};
