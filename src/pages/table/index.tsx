import UseFixTop from "@/hooks/useFixTop";
import UseModal from "@/hooks/useModal";
import {
  CloseCircleFilled,
  ExclamationCircleFilled,
  FilterOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import React, { useState, useEffect, useRef, memo } from "react";
import { useTranslation } from "react-i18next";
import { scaleOption } from "./mock";
import styles from "./index.module.scss";
import TableContent from "./tableContent";
import {
  Button,
  Drawer,
  Form,
  Input,
  Modal,
  Select,
  Pagination,
  PaginationProps,
  Table,
  TableProps,
  Tabs,
  theme,
  Tooltip,
} from "antd";
import UseDraws from "@/hooks/useDraw";
import ActivityComp from "./components/activityComp";
import ContactPerson from "./components/contactPerson";
import DetailedInfo from "./components/detailedInfo";
import DrawerHeader from "./components/drawerHeader";
import ImportantInfo from "./components/importantInfo";

const { confirm } = Modal;
type FieldType = {
  scene?: string;
};
function TableComp(props: any) {
  const { t } = useTranslation();
  const {
    modalOpen,
    showModal,
    onModalClose,
    handleModalOk,
    handleModalCancel,
  } = UseModal();
  const headerRef = useRef(null);
  const advancedScreeningRef = useRef(null);
  const { fixTopHeight } = UseFixTop();
  const { placement, drawerOpen, showDrawer, onDrawerClose } = UseDraws();
  const [isSelectMode, setIsSelectMode] = useState({
    show: false,
    data: [],
  });

  const [tableData, setTableData] = useState<any[]>([]);
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
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

  useEffect(() => {
    window.$busInc.on("handleTableSelect", (args) => {
      setIsSelectMode({
        show: !!(args.data && args.data.length),
        data: args.data,
      });
    });
    return () => {
      window.$busInc.off("handleTableSelect", (args) => {
        setIsSelectMode({
          show: !!(args.data && args.data.length),
          data: args.data,
        });
      });
    };
  }, []);
  return (
    <>
      <div className="fixTopLayout">
        <div ref={headerRef} className="fixTopHeader">
          {isSelectMode.show ? (
            <div className="fixTopHeader_main">
              <p>
                已选中 <strong>{isSelectMode.data?.length || 0}</strong> 项
              </p>
            </div>
          ) : (
            <Form name="basic" layout="inline" autoComplete="off">
              <Form.Item<FieldType> label={t("scene")} name="scene">
                <Select
                  allowClear
                  style={{ width: 200 }}
                  defaultValue={"0"}
                  placeholder={t("selectPlaceholder")}
                  options={[...scaleOption]}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  icon={<FilterOutlined />}
                  onClick={() => {
                    showModal();
                  }}
                >
                  {t("advancedScreening")}
                </Button>
              </Form.Item>
            </Form>
          )}
        </div>
        <div className="fixTopLayout_child">
          <TableContent
            pageNum={pageNum}
            pageSize={pageSize}
            total={total}
            tableColumns={tableColumns}
            tableItemDetail={tableItemDetail}
            tableData={tableData}
            drawerOpen={drawerOpen}
            placement={placement}
            onDrawerClose={onDrawerClose}
            onShowSizeChange={onShowSizeChange}
            onChangePageNum={onChangePageNum}
          >
            <div slot="EditComp">
              <EditComp
                tableItemDetail={tableItemDetail}
                handleDetail={handleDetail}
                pageSize={pageSize}
              />
            </div>
          </TableContent>
        </div>
        // 高级筛选
        <Modal
          title={t("advancedScreening")}
          open={modalOpen}
          width={800}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
          cancelText={t("cancelText")}
          okText={t("confirmText")}
        >
          <HeightFilterComp ref={advancedScreeningRef} />
        </Modal>
      </div>
    </>
  );
}
export default TableComp;

class AdvancedScreening {
  screening: string | null;
  remark: string | null;
  constructor() {
    (this.screening = null), (this.remark = null);
  }
}
// 高级筛选组件
export const HeightFilterComp = memo((props: any) => {
  const { t } = useTranslation();
  const [advancedScreening, setAdvancedScreening] = useState([
    new AdvancedScreening(),
  ]);

  // 添加筛选条件
  const addScreening = () => {
    setAdvancedScreening([...advancedScreening, new AdvancedScreening()]);
  };
  // 删除筛选条件
  const clearScreening = (idx: number) => {
    confirm({
      title: "提示",
      icon: <ExclamationCircleFilled />,
      content: "确定删除?",
      cancelText: t("cancelText"),
      okText: t("confirmText"),
      onOk() {
        let newArr = [...advancedScreening];
        newArr.splice(idx, 1);
        setAdvancedScreening([...newArr]);
      },
    });
  };
  return (
    <div className="modalStyle">
      <p className="modalStyle_label">{t("screeningCondition")}</p>
      {advancedScreening?.map((item, idx) => {
        return (
          <div className={styles.screening} key={idx}>
            <Select
              style={{ width: 200, marginRight: 20 }}
              placeholder={t("selectPlaceholder")}
              options={[...scaleOption]}
              value={item.screening}
            />
            <Input
              style={{ width: 200, marginRight: 20 }}
              value={item.remark}
              placeholder={t("inputPlaceholder")}
            />
            <div
              className={styles.screening_clear}
              onClick={() => {
                clearScreening(idx);
              }}
            >
              <CloseCircleFilled />
            </div>
          </div>
        );
      })}
      <Button
        type="link"
        onClick={() => {
          addScreening();
        }}
      >
        + 添加筛选条件
      </Button>
    </div>
  );
});

// 编辑组件
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
