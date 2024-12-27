import { useAppSelector } from "@/store/hooks";
import {
  CloseCircleFilled,
  EditOutlined,
  PlusCircleFilled,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Button, DatePicker, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState, useEffect, memo, useRef } from "react";
import styles from "./index.module.scss";
function ActivityComp(props: any) {
  const { AntdTokenStyle } = useAppSelector((store) => {
    return store.Theme;
  });
  const [activeBlock, setActiveBlock] = useState(null);
  const [primaryColor, setPrimaryColor] = useState(AntdTokenStyle.colorPrimary);
  const btnList = [
    {
      title: "写跟进",
      eventClick: () => {
        handleChangeBlock(1);
        console.log("写跟进");
      },
    },
    {
      title: "创建项目",
      eventClick: () => {
        handleChangeBlock(2);
        console.log("创建项目");
      },
    },
    {
      title: "创建项目",
      eventClick: () => {
        handleChangeBlock(3);
        console.log("创建项目");
      },
    },
    {
      title: "创建联系人",
      eventClick: () => {
        handleChangeBlock(4);
        console.log("创建联系人");
      },
    },
    {
      title: "创建商机",
      eventClick: () => {
        handleChangeBlock(5);
        console.log("创建商机");
      },
    },
    {
      title: "创建合同",
      eventClick: () => {
        handleChangeBlock(6);
        console.log("创建合同");
      },
    },
    {
      title: "创建回款",
      eventClick: () => {
        handleChangeBlock(7);
        console.log("创建回款");
      },
    },
  ];

  const handleChangeBlock = (idx) => {
    setActiveBlock(idx);
  };

  const style = {
    "--btn-hover-color": AntdTokenStyle.colorPrimary,
  } as React.CSSProperties;
  return (
    <div className={styles.ActivityComp}>
      <div className={styles.ActivityComp_btnList}>
        {btnList?.map((item, idx) => {
          return (
            <div
              key={idx}
              className={styles.ActivityComp_btnList_item}
              style={{
                ...style,
                backgroundColor:
                  activeBlock === idx + 1 ? primaryColor : "#f1f5fd",
                color: activeBlock === idx + 1 ? "#fff" : "#666",
              }}
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
      <EditComp
        activeBlock={activeBlock}
        handleChangeBlock={handleChangeBlock}
      />
    </div>
  );
}
export default memo(ActivityComp);

const EditComp = memo((props: any) => {
  const { activeBlock, handleChangeBlock } = props;
  const compMap = {
    1: () => <WriteFollowUp />,
    2: () => <CreateProject />,
  };
  let Component = compMap[activeBlock] || null;

  return (
    <div className={styles.EditComp}>
      {!activeBlock && !Component ? (
        <div
          className={styles.EditComp_empty}
          onClick={() => {
            handleChangeBlock(1);
          }}
        >
          <EditOutlined />
          <p>请输入内容</p>
        </div>
      ) : (
        <>
          {Component ? (
            <>
              <Component />
              <div
                className={styles.EditComp_close}
                onClick={() => {
                  handleChangeBlock(null);
                }}
              >
                <CloseCircleFilled />
              </div>
            </>
          ) : null}
        </>
      )}
    </div>
  );
});

// 写跟进
const WriteFollowUp = memo((props) => {
  return (
    <div className={styles.WriteFollowUp}>
      <div className={styles.WriteFollowUp_top}>
        <Select
          style={{ width: 150, marginRight: "10px" }}
          placeholder={"请选择联系人"}
          options={[]}
        />
        <Select
          style={{ width: 150, marginRight: "10px" }}
          placeholder={"请选择联系人"}
          options={[]}
        />
        <DatePicker style={{ width: 150, marginRight: "10px" }} />
        <Button>常用语</Button>
      </div>
      <div className={styles.WriteFollowUp_input}>
        <TextArea variant="borderless" rows={4} placeholder="请输入内容" />
      </div>
      <div className={styles.WriteFollowUp_btn}>
        <div className={styles.WriteFollowUp_btn_left}></div>
        <div className={styles.WriteFollowUp_btn_right}>
          <Button type="primary" size={"small"}>
            发布
          </Button>
        </div>
      </div>
    </div>
  );
});

const CreateProject = memo((props) => {
  return (
    <div className={styles.CreateProject}>
      <div className={styles.WriteFollowUp_input}>
        <TextArea variant="borderless" rows={4} placeholder="请输入内容" />
      </div>
      <div className={styles.WriteFollowUp_btn}>
        <div className={styles.WriteFollowUp_btn_left}></div>
        <div className={styles.WriteFollowUp_btn_right}>
          <Button type="primary" size={"small"}>
            发布
          </Button>
        </div>
      </div>
    </div>
  );
});
