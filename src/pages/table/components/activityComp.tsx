import { PlusCircleFilled, PlusCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useState, useEffect, memo } from "react";
import styles from "./index.module.scss";
function ActivityComp(props: any) {
  const btnList = [
    {
      title: "写跟进",
      eventClick: () => {
        console.log("写跟进");
      },
    },
    {
      title: "创建项目",
      eventClick: () => {
        console.log("创建项目");
      },
    },
    {
      title: "创建项目",
      eventClick: () => {
        console.log("创建项目");
      },
    },
    {
      title: "创建联系人",
      eventClick: () => {
        console.log("创建联系人");
      },
    },
    {
      title: "创建商机",
      eventClick: () => {
        console.log("创建商机");
      },
    },
    {
      title: "创建合同",
      eventClick: () => {
        console.log("创建合同");
      },
    },
    {
      title: "创建回款",
      eventClick: () => {
        console.log("创建回款");
      },
    },
  ];
  return (
    <div className={styles.ActivityComp}>
      <div className={styles.ActivityComp_btnList}>
        {btnList?.map((item, idx) => {
          return (
            <div
              key={idx}
              className={styles.ActivityComp_btnList_item}
              onClick={() => {
                item.eventClick();
              }}
            >
              <PlusCircleFilled style={{ marginRight: "5px" }} />
              <span>{item.title}</span>
            </div>
          );
        })}
      </div>
      <EditComp />
    </div>
  );
}
export default memo(ActivityComp);

const EditComp = memo((props) => {
  return <div className={styles.EditComp}></div>;
});
