import { Card } from "antd";
import React, { useState, useEffect, memo } from "react";
import styles from "./index.module.scss";
function EditMode(props: any) {
  return (
    <div className={styles.EditMode}>
      <div
        className={styles.EditMode_mask}
        onClick={() => {
          window.$busInc.emit("changeMode", {
            isEditMode: false,
          });
        }}
      ></div>
      <div className={styles.EditMode_page}>
        <Card style={{ height: "100%" }}>
          <h1>编辑</h1>
        </Card>
      </div>
    </div>
  );
}
export default memo(EditMode);
