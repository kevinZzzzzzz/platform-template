import { generatedRoutes } from "@/router/routes";
import { handledRoutes, handleFlattenRoutes } from "./elegant";

// 路由信息表
const AllRouters: GeneratedRoute[] = handledRoutes(generatedRoutes);
// 扁平化路由信息
const flattenRoutes: GeneratedRoute[] = handleFlattenRoutes(AllRouters);

console.log(AllRouters, AllRouters);
export { AllRouters, flattenRoutes };
