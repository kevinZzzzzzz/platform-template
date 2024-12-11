import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useState, useEffect, memo } from "react";
import styles from "./index.module.scss";
import { InfoDetailData } from "../mock";

function ImportantInfo(props: any) {
  const [infoDetail, setInfoDetail] = useState([]);
  useEffect(() => {
    setInfoDetail(() => {
      return InfoDetailData?.reduce((pre, next) => {
        return [...pre, ...next?.blockData];
      }, []);
    });
  }, []);
  return (
    <div className={styles.ImportantInfo}>
      <div className={styles.ImportantInfo_blockTop}>
        <p className={styles.ImportantInfo_blockTop_emptyText}>
          暂无客户首要联系人
        </p>
        <Button type="primary" icon={<PlusOutlined />}>
          新建联系人
        </Button>
      </div>
      <div className={styles.ImportantInfo_blockMain}>
        <h4>基本资料</h4>
        {infoDetail?.map((d, idx) => {
          return (
            <div key={idx} className={styles.ImportantInfo_blockMain_item}>
              <p>{d.label}</p>
              <h5>{d.value}</h5>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default memo(ImportantInfo);
