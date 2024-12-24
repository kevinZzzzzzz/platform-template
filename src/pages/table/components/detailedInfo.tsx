import React, { useState, useEffect, memo } from "react";
import { InfoDetailData } from "../mock";
import styles from "./index.module.scss";

function DetailedInfo(props: any) {
  const [infoDetail, setInfoDetail] = useState(InfoDetailData);
  return (
    <div className={styles.DetailedInfo}>
      {infoDetail?.map((d, idx) => {
        return <DetailInfoBlock key={idx} info={d}></DetailInfoBlock>;
      })}
    </div>
  );
}
export default memo(DetailedInfo);

const DetailInfoBlock = memo((props: any) => {
  const { blockName, blockData } = props.info;
  return (
    <div className={styles.DetailInfoBlock}>
      <div className={styles.DetailInfoBlock_header}>
        <h4>{blockName}</h4>
      </div>
      <div className={styles.DetailInfoBlock_main}>
        {blockData?.map((d, idx) => {
          return <DetailInfoItem key={idx} label={d.label} content={d.value} />;
        })}
      </div>
    </div>
  );
});

const DetailInfoItem = memo((props: any) => {
  const { label, content } = props;
  return (
    <div className={styles.DetailInfoItem}>
      <div className={styles.DetailInfoItem_label}>
        <span>{label}</span>
      </div>
      <div className={styles.DetailInfoItem_content}>
        <span>{content}</span>
      </div>
    </div>
  );
});
