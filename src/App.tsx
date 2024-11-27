import React, { Suspense } from "react";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { flattenRoutes as routes } from "./router/index";
import api from "@/api";
import { AliveScope } from "react-activation";
import KeepAliveComp from "@/components/KeepAliveComp";

declare global {
  interface Window {
    $api: any;
  }
}
/* 
  设置全局变量
*/
window.$api = { ...api };
console.log(routes);

function App() {
  return (
    <HashRouter>
      <AliveScope>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />}></Route>
          <Route
            path="/:notFoundPath"
            element={<Navigate to="/exception/404" />}
          ></Route>
          {routes.map((e: any) => {
            return (
              <Route
                key={e.key}
                path={e.path}
                element={
                  <e.layout>
                    <Suspense fallback={<div></div>}>
                      <KeepAliveComp {...e}>
                        <e.component />
                      </KeepAliveComp>
                    </Suspense>
                  </e.layout>
                }
              ></Route>
            );
          })}
        </Routes>
      </AliveScope>
    </HashRouter>
  );
}
export default App;
