import {
  CheckCircleOutlined,
  HeartOutlined,
  InfoCircleOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import React, { useState, useEffect, memo } from "react";

function DrawerHeader(props: any) {
  const { tableItemDetail, handleDetail, pageSize } = props;
  function handleEdit() {
    window.$busInc.emit("changeMode", {
      show: true,
      title: "编辑客户",
      compName: "EditClient",
    });
  }

  const handleTurnPage = (dict: "prev" | "next") => {
    if (dict === "prev") {
      if (tableItemDetail.index > 0) {
        handleDetail(null, tableItemDetail.index - 1);
      }
    } else {
      if (tableItemDetail.index < pageSize - 1) {
        handleDetail(null, tableItemDetail.index + 1);
      }
    }
  };
  return (
    <div className="drawerLayout_header_main">
      <div className="drawerLayout_header_main_top">
        <div className="drawerLayout_header_main_top_left">
          <div className="drawerLayout_header_main_top_left_avatar"></div>
          <div className="drawerLayout_header_main_top_left_info">
            <p>客户</p>
            <h6>{tableItemDetail.customerName}</h6>
          </div>
          <div className="drawerLayout_header_main_top_left_operate">
            <HeartOutlined />
            <div className="drawerLayout_header_main_top_left_operate_btn">
              <Button
                size="small"
                onClick={() => {
                  handleTurnPage("prev");
                }}
              >
                <LeftOutlined />
              </Button>
              <Button
                size="small"
                onClick={() => {
                  handleTurnPage("next");
                }}
              >
                <RightOutlined />
              </Button>
            </div>
          </div>
        </div>
        <div className="drawerLayout_header_main_top_right">
          <Button
            color="default"
            variant="solid"
            icon={<InfoCircleOutlined />}
            onClick={() => {
              handleEdit();
            }}
          >
            编辑
          </Button>
          <Button
            color="primary"
            variant="solid"
            icon={<CheckCircleOutlined />}
          >
            更改成交状态
          </Button>
          <Button>...</Button>
        </div>
      </div>
      <div className="drawerLayout_header_main_bottom">
        <div className="drawerLayout_header_main_bottom_item">
          <p>客户级别</p>
        </div>
        <div className="drawerLayout_header_main_bottom_item">
          <p>成交状态</p>
          <h5>xxx</h5>
        </div>
        <div className="drawerLayout_header_main_bottom_item">
          <p>负责人</p>
          <h5>xxx</h5>
        </div>
        <div className="drawerLayout_header_main_bottom_item">
          <p>更新时间</p>
          <h5>2024-04-19 01:00:39</h5>
        </div>
      </div>
    </div>
  );
}
export default memo(DrawerHeader);
