import React, { Suspense } from "react";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { flattenRoutes as routes } from "./router/index";
import api from "@/api";

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
                    {e.component ? <e.component /> : null}
                  </Suspense>
                </e.layout>
              }
            ></Route>
          );
        })}
      </Routes>
    </HashRouter>
  );
}
export default App;
