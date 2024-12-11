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
  theme,
} from "antd";
import React, { useState, useEffect, memo } from "react";
import ActivityComp from "./components/activityComp";
import DetailedInfo from "./components/detailedInfo";
import DrawerHeader from "./components/drawerHeader";
import ImportantInfo from "./components/importantInfo";

function TableContent(props: any) {
  const [tableData, setTableData] = useState<any[]>([]);
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(500);
  const { tableScrollHeight, fixTopHeight } = UseFixTop();
  const { placement, drawerOpen, showDrawer, onDrawerClose } = UseDraws();
  const [tableColumns, setTableColumns] = useState([]);

  const handleTableColumns = (columns) => {
    const arrTemp = columns.map((d) => {
      return {
        title: d.name,
        dataIndex: d.fieldName,
      };
    });
    arrTemp[0] = {
      ...arrTemp[0],
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
    };
    arrTemp.push({
      title: "关注",
      dataIndex: "follow",
      width: 120,
      fixed: "right",
    });
    setTableColumns(arrTemp);
  };
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
    import("./mock/header.json").then((res) => {
      handleTableColumns(res.default.data);
    });
  }, []);
  useEffect(() => {
    const obj = {
      customerName: "南京红十字血液中心",
    };
    const arr = new Array(pageSize).fill(obj);
    // setTotal(arr.length);
    setTableData(arr);
  }, [pageSize]);
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
        style={{
          "--table-body-height": `${tableScrollHeight - fixTopHeight}px`,
        }}
        scroll={{ x: 2000, y: `${tableScrollHeight - fixTopHeight}px` }}
        rowSelection={{ type: "checkbox", columnWidth: 48, ...rowSelection }}
        columns={tableColumns}
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
      children: <ActivityComp />,
    },
    {
      key: "2",
      label: "详细资料",
      children: <DetailedInfo />,
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
      children: <ImportantInfo />,
    },
  ];
  return (
    <div className="drawerLayout">
      <div className="drawerLayout_header">
        <DrawerHeader />
      </div>
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
