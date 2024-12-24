import UseDraws from "@/hooks/useDraw";
import UseFixTop from "@/hooks/useFixTop";
import { defaultGetContainer } from "@/layout/base";
import { HeartOutlined } from "@ant-design/icons";
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
import React, { useState, useEffect, memo, useRef } from "react";
import ActivityComp from "./components/activityComp";
import ContactPerson from "./components/contactPerson";
import DetailedInfo from "./components/detailedInfo";
import DrawerHeader from "./components/drawerHeader";
import ImportantInfo from "./components/importantInfo";

function TableContent(props: any) {
  const [tableData, setTableData] = useState<any[]>([]);
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const { tableScrollHeight, fixTopHeight } = UseFixTop();
  const { placement, drawerOpen, showDrawer, onDrawerClose } = UseDraws();
  const [tableColumns, setTableColumns] = useState([]);
  const [tableItemDetail, setTableItemDetail] = useState({});

  const handleTableColumns = (columns) => {
    const arrTemp = columns.map((d, idx) => {
      if (!idx) {
        return {
          title: d.name,
          dataIndex: d.fieldName,
          idx: idx,
          width: 200,
          fixed: "left",
          ellipsis: {
            showTitle: false,
          },
          sorter: (a, b) => a[d.fieldName] - b[d.fieldName],
          render: (text, scope, index) => (
            <Button
              type="link"
              onClick={() => {
                handleDetail(scope, index);
              }}
            >
              {text?.length > 15 ? (
                <Tooltip placement="topLeft" title={text}>
                  {text?.slice(0, 10) + "..."}
                </Tooltip>
              ) : (
                <span>{text}</span>
              )}
            </Button>
          ),
        };
      } else {
        return {
          title: d.name,
          dataIndex: d.fieldName,
          idx: idx,
          width: 100,
          sorter: (a, b) => a[d.fieldName] - b[d.fieldName],
          ellipsis: {
            showTitle: false,
          },
          render: (text) =>
            text?.length > 10 ? (
              <Tooltip placement="topLeft" title={text}>
                {text}
              </Tooltip>
            ) : (
              <span>{text}</span>
            ),
        };
      }
    });
    arrTemp.push({
      title: "关注",
      dataIndex: "follow",
      width: 120,
      fixed: "right",
      render: () => <HeartOutlined />,
    });
    setTableColumns(arrTemp);
  };
  const rowSelection: TableProps["rowSelection"] = {
    onChange: (selectedRowKeys: React.Key[], selectedRows) => {
      window.$busInc.emit("handleTableSelect", {
        data: selectedRows,
      });
    },
  };

  const handleDetail = (scope, index) => {
    const detail = scope || tableData[index];
    scope && showDrawer();
    setTableItemDetail({ ...detail, index });
  };
  useEffect(() => {
    import("./mock/header.json").then((res) => {
      handleTableColumns(res.default.data);
    });
  }, []);
  useEffect(() => {
    import("./mock/data.json").then((res: any) => {
      console.log(res.default.data, "res");
      const arr = res.default.data.map((d, idx) => {
        return {
          ...d,
          index: idx,
        };
      });
      setTableData(() => arr);
      setTotal(arr.length);
    });
  }, []);

  // pageSize 变化的回调
  const onShowSizeChange: PaginationProps["onShowSizeChange"] = (
    current,
    pageSize
  ) => {
    setPageSize(pageSize);
  };
  // 切换页码
  const onChangePageNum: PaginationProps["onChange"] = (pageNumber) => {
    setPageNum(pageNumber);
  };
  const showTotal: PaginationProps["showTotal"] = (total) => `总共 ${total} 条`;

  const style = {
    "--table-body-height": `${tableScrollHeight - fixTopHeight - 43 - 48}px`,
  } as React.CSSProperties;
  return (
    <>
      <Table
        style={style}
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
      <Drawer
        width={"75%"}
        placement={placement}
        closable={false}
        open={drawerOpen}
        onClose={onDrawerClose}
        key={placement}
        destroyOnClose={true}
      >
        <EditComp
          tableItemDetail={tableItemDetail}
          handleDetail={handleDetail}
          pageSize={pageSize}
        />
      </Drawer>
    </>
  );
}
const EditComp = memo((props: any) => {
  const { tableItemDetail, handleDetail, pageSize } = props;
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
      children: <ContactPerson />,
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
        <DrawerHeader
          tableItemDetail={tableItemDetail}
          handleDetail={handleDetail}
          pageSize={pageSize}
        />
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
