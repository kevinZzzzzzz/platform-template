import { CloseOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";
import React, { useState, useEffect, memo, lazy } from "react";
import EditClient from "./editComp/EditClient";
import styles from "./index.module.scss";
function EditMode(props: any) {
  const { isEditModeInfo } = props;

  const handleClose = (type: "cancel" | "save") => {
    window.$busInc.emit("changeMode", {
      show: false,
      title: "",
      compName: "",
    });
  };
  const compMap = {
    EditClient: () => <EditClient />,
  };
  let Component = compMap[isEditModeInfo.compName] || null;

  return (
    <div className={styles.EditMode}>
      <div className={styles.EditMode_mask}></div>
      <div className={styles.EditMode_page}>
        <Card style={{ height: "100%", position: "relative" }}>
          <div className={styles.EditMode_page_header}>
            <h1>{isEditModeInfo.title}</h1>
            <div
              className={styles.EditMode_page_header_close}
              onClick={() => {
                handleClose("cancel");
              }}
            >
              <CloseOutlined />
            </div>
          </div>
          <div className={styles.EditMode_page_body}>
            {Component ? <Component /> : null}
          </div>
          <div className={styles.EditMode_page_footer}>
            <Button
              size="middle"
              onClick={() => {
                handleClose("cancel");
              }}
            >
              取消
            </Button>
            <Button
              size="middle"
              type="primary"
              onClick={() => {
                handleClose("save");
              }}
            >
              保存
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
export default memo(EditMode);
