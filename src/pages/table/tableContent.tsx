import UseDraws from "@/hooks/useDraw";
import UseFixTop from "@/hooks/useFixTop";
import {
  Button,
  Drawer,
  Pagination,
  PaginationProps,
  Table,
  TableProps,
  Tabs,
} from "antd";
import React, { useState, useEffect, memo } from "react";

function TableContent(props: any) {
  const [tableData, setTableData] = useState<any[]>([]);
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const { tableScrollHeight, fixTopHeight } = UseFixTop();
  const { placement, drawerOpen, showDrawer, onDrawerClose } = UseDraws();
  const columns: TableProps["columns"] = [
    {
      title: "客户名称",
      dataIndex: "customerName",
      width: 200,
      fixed: "left",
      render: (text, scope, index) => (
        <Button
          type="link"
          onClick={() => {
            showDrawer();
          }}
        >
          {text}
          {index + 1}
        </Button>
      ),
    },
    {
      title: "客户来源",
      dataIndex: "customerOrigin",
    },
    {
      title: "手机",
      dataIndex: "tel",
    },
    {
      title: "电话",
      dataIndex: "phone",
    },
    {
      title: "网址",
      dataIndex: "site",
    },
    {
      title: "邮箱",
      dataIndex: "email",
    },
    {
      title: "客户行业",
      dataIndex: "customerIndustry",
    },
    {
      title: "客户级别",
      dataIndex: "customerLevel",
    },
    {
      title: "备注",
      dataIndex: "remark",
    },
    {
      title: "负责人",
      dataIndex: "remark0",
    },
    {
      title: "更新时间",
      dataIndex: "remark9",
    },
    {
      title: "创建人",
      dataIndex: "remark1",
    },
    {
      title: "电话",
      dataIndex: "phone1",
    },
    {
      title: "网址",
      dataIndex: "site1",
    },
    {
      title: "邮箱",
      dataIndex: "email1",
    },
    {
      title: "客户行业",
      dataIndex: "customerIndustry1",
    },
    {
      title: "客户级别",
      dataIndex: "customerLevel1",
    },
    {
      title: "备注",
      dataIndex: "remark2",
    },
    {
      title: "负责人",
      dataIndex: "remark3",
    },
    {
      title: "更新时间",
      dataIndex: "remark4",
    },
    {
      title: "创建人",
      dataIndex: "remark5",
    },
    {
      title: "关注",
      dataIndex: "follow",
      width: 120,
      fixed: "right",
    },
  ];
  const rowSelection: TableProps["rowSelection"] = {
    onChange: (selectedRowKeys: React.Key[], selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User", // Column configuration not to be checked
      name: record.name,
    }),
  };
  useEffect(() => {
    const obj = {
      customerName: "南京红十字血液中心",
    };
    const arr = new Array(100).fill(obj);
    setTotal(arr.length);
    setTableData(arr);
  }, []);
  const onShowSizeChange: PaginationProps["onShowSizeChange"] = (
    current,
    pageSize
  ) => {
    setPageNum(current);
    setPageSize(pageSize);
  };

  return (
    <>
      <Table
        scroll={{ x: 2000, y: `${tableScrollHeight - fixTopHeight}px` }}
        rowSelection={{ type: "checkbox", columnWidth: 48, ...rowSelection }}
        columns={columns}
        dataSource={tableData}
        pagination={{
          align: "end",
          current: pageNum,
          pageSize: pageSize,
          total: total,
          showSizeChanger: true,
          pageSizeOptions: [10, 20, 50, 100],
          onShowSizeChange: onShowSizeChange,
        }}
      />
      <Drawer
        width={"75%"}
        placement={placement}
        closable={false}
        open={drawerOpen}
        onClose={onDrawerClose}
        key={placement}
      >
        <EditComp />
      </Drawer>
    </>
  );
}
const EditComp = memo((props) => {
  const lefTabs = [
    {
      key: "1",
      label: "活动",
      children: "活动",
    },
    {
      key: "2",
      label: "详细资料",
      children: "详细资料",
    },
    {
      key: "3",
      label: "联系人",
      children: "联系人",
    },
    {
      key: "4",
      label: "团队成员",
      children: "团队成员",
    },
    {
      key: "5",
      label: "商机",
      children: "商机",
    },
    {
      key: "6",
      label: "合同",
      children: "合同",
    },
    {
      key: "7",
      label: "回款",
      children: "回款",
    },
    {
      key: "8",
      label: "回访",
      children: "回访",
    },
    {
      key: "9",
      label: "发票",
      children: "发票",
    },
    {
      key: "10",
      label: "附件",
      children: "附件",
    },
    {
      key: "11",
      label: "操作记录",
      children: "操作记录",
    },
  ];
  const rightTabs = [
    {
      key: "1",
      label: "重要信息",
      children: "重要信息",
    },
  ];
  return (
    <div className="drawerLayout">
      <div className="drawerLayout_header"></div>
      <div className="drawerLayout_main">
        <div className="drawerLayout_main_left">
          <Tabs
            type="card"
            defaultActiveKey="1"
            size={"small"}
            items={lefTabs}
          />
        </div>
        <div className="drawerLayout_main_right">
          <Tabs
            type="card"
            defaultActiveKey="1"
            size={"small"}
            items={rightTabs}
          />
        </div>
      </div>
    </div>
  );
});
export default memo(TableContent);
