import UseFixTop from "@/hooks/useFixTop";
import {
  Button,
  Drawer,
  Pagination,
  PaginationProps,
  Table,
  TableProps,
  Tabs,
  theme,
  Tooltip,
} from "antd";
import React, { useState, useEffect, memo, useRef, useMemo } from "react";
import ResizeableTable from "./components/ResizeableTable";

function TableContent(props: any) {
  const {
    pageNum,
    pageSize,
    total,
    tableColumns,
    tableData,
    onShowSizeChange,
    onChangePageNum,
    onDrawerClose,
    drawerOpen,
    placement,
  } = props;

  const childCompList = useMemo(() => {
    return Array.isArray(props.children) ? props.children : [props.children];
  }, [props.children]);
  const slots = childCompList?.reduce((slots, item) => {
    slots[item.props.slot] = item;
    return slots;
  }, {});

  const { tableScrollHeight, fixTopHeight } = UseFixTop();

  const rowSelection: TableProps["rowSelection"] = {
    onChange: (selectedRowKeys: React.Key[], selectedRows) => {
      window.$busInc.emit("handleTableSelect", {
        data: selectedRows,
      });
    },
  };
  const style = {
    "--table-body-height": `${tableScrollHeight - fixTopHeight - 43 - 48}px`,
  } as React.CSSProperties;
  const showTotal: PaginationProps["showTotal"] = (total) => `总共 ${total} 条`;

  return (
    <>
      {!tableColumns.length ? null : (
        <ResizeableTable
          style={style}
          rowClassName={(record, index) => {
            return index % 2 === 0 ? "table-even-row" : "table-odd-row";
          }}
          scroll={{
            x: 2000,
            y: `${tableScrollHeight - fixTopHeight - 43 - 48}px `,
          }}
          rowSelection={{ type: "checkbox", columnWidth: 48, ...rowSelection }}
          columns={tableColumns}
          dataSource={tableData}
          rowKey={(recode) => {
            return recode.index;
          }}
          pagination={{
            align: "end",
            current: pageNum,
            pageSize: pageSize,
            total: total,
            showTotal: showTotal,
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: [10, 20, 50, 100],
            onShowSizeChange: onShowSizeChange,
            onChange: onChangePageNum,
          }}
        />
      )}
      {/* 抽屉查看详情 */}
      <Drawer
        width={"75%"}
        placement={placement}
        closable={false}
        open={drawerOpen}
        onClose={onDrawerClose}
        key={placement}
        destroyOnClose={true}
      >
        {slots["EditComp"]}
      </Drawer>
    </>
  );
}
export default memo(TableContent);
