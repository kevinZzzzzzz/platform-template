import React, { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import styles from "./index.module.scss";
import { useAppSelector } from "@/store/hooks";
import { requireImg } from "@/utils";
import { Empty, notification } from "antd";
import { importPluginList } from "@/layout/base/components/HeaderComp/mock";

function PluginTextPage(props: any) {
  const { pluginList } = useAppSelector((store) => {
    return store.Layout;
  });
  const handlePluginRun = (id) => {
    window.$plugins[`P${id}`]?.print();
    notification.success({
      message: window.$plugins[`P${id}`]?.name,
      description: window.$plugins[`P${id}`]?.describe,
    });
  };
  const pluginListInTime = useMemo(() => {
    return importPluginList.map((d1) => {
      return {
        ...d1,
        status: pluginList?.find((d2) => d2.key === d1.key) ? 1 : 0,
      };
    });
  }, [pluginList]);
  return (
    <>
      {pluginList && pluginList.length ? (
        <div className={styles.pluginList}>
          {pluginListInTime?.map((d, idx) => {
            return (
              <div
                key={idx}
                className={styles.pluginList_item}
                onClick={() => {
                  handlePluginRun(d.key);
                }}
              >
                <div
                  className={styles.pluginList_item_info}
                  style={{
                    opacity: d.status ? 1 : 0.5,
                  }}
                >
                  <img src={requireImg("/src/assets/chajian.png")} alt="" />
                  <div className={styles.pluginList_item_info_name}>
                    <p>{d.name}</p>
                    <h6>{d.description}</h6>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <Empty
          imageStyle={{ width: "100%", height: "100%" }}
          description="暂无插件"
        ></Empty>
      )}
    </>
  );
}
export default PluginTextPage;
