import UseFixTop from "@/hooks/useFixTop";
import UseModal from "@/hooks/useModal";
import {
  CloseCircleFilled,
  ExclamationCircleFilled,
  FilterOutlined,
} from "@ant-design/icons";
import { Button, Drawer, Form, Input, Modal, Select } from "antd";
import React, { useState, useEffect, useRef, memo } from "react";
import { useTranslation } from "react-i18next";
import { scaleOption } from "./mock";
import styles from "./index.module.scss";
import TableContent from "./tableContent";
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

  return (
    <>
      <div className="fixTopLayout">
        <div ref={headerRef} className="fixTopHeader">
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
        </div>
        <div
          className="fixTopLayout_child"
          style={{ height: `calc(100% - ${fixTopHeight}px - 24px)` }}
        >
          <TableContent />
        </div>
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
export const HeightFilterComp = memo(() => {
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
