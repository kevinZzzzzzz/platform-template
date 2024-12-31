import React, { useEffect, useState, useMemo, memo } from "react";
import { Popconfirm, Table } from "antd";
// import "antd/dist/antd.css";
import { Resizable } from "react-resizable";
import "./resizeable-table.scss";
import { FilterFilled } from "@ant-design/icons";

interface TableProps {
  style?: React.CSSProperties;
  rowClassName?: (
    record: any,
    index: any
  ) => "table-even-row" | "table-odd-row";
  scroll?: { x: number; y: string };
  rowSelection?: { preserveSelectedRowKeys?: boolean };
  columns: any[];
  dataSource: any[];
  rowKey: (record: any) => any;
  pagination?: any;
}
const ResizeableTitle: React.FC = (props: any) => {
  const [resizing, setResizing] = useState(false);
  const { onResize, width, onClick, ...restProps } = props;
  if (!width) {
    return <th {...restProps} />;
  }
  return (
    <Resizable
      width={width}
      height={0}
      onResizeStart={() => setResizing(true)}
      onResizeStop={() => {
        setTimeout(() => {
          setResizing(false);
        });
      }}
      onResize={onResize}
    >
      <th
        onClick={(...args) => {
          console.log(">>>", resizing);
          if (!resizing && onClick) {
            onClick(...args);
          }
        }}
        {...restProps}
      />
    </Resizable>
  );
};

const ResizeableTable: React.FC<TableProps> = (props: any) => {
  const [columns, setColumns] = useState(props.columns);
  useEffect(() => {
    // handleFilterTableHeader();
    const handlers = document.querySelectorAll(
      ".react-resizable .react-resizable-handle"
    );
    handlers.forEach((handler) =>
      handler.addEventListener("click", (e) => {
        // console.log("e", e);
        return false;
      })
    );
  }, []);
  const handleFilterTableHeader = () => {
    const columnsTemp = props.columns;
    const filterHeader = columnsTemp
      .slice(0, columnsTemp.length - 1)
      .map((a) => {
        return {
          text: a.title,
          value: a.title,
        };
      });
  };
  const handleResize =
    (index) =>
    (e, { size }) => {
      e.stopImmediatePropagation();
      // e.preventDefault();
      setColumns((pre) => {
        const nextColumns = [...pre];
        nextColumns[index] = {
          ...nextColumns[index],
          width: size.width,
        };
        return nextColumns;
      });
    };
  const columnsTemp = useMemo(() => {
    const arr = columns.map((col, index) => {
      return {
        ...col,
        onHeaderCell: (column) => ({
          width: column.width,
          onResize: handleResize(index),
        }),
      };
    });
    return arr;
  }, [columns]);
  const components = Object.assign({}, props.components, {
    header: {
      cell: ResizeableTitle,
    },
  });
  const onChangeFilter = (
    pagination,
    filters,
    extra: {
      action: "filter";
    }
  ) => {
    console.log(pagination, filters);
  };
  return (
    <div className="tableRef">
      {/* <div className="tableRef_filterBtn">
        <Popconfirm
          placement="bottom"
          title=""
          icon={null}
          description={<FilterSelectHeader />}
          // onConfirm={confirm}
          // onCancel={cancel}
          okText="确定"
          cancelText="取消"
        >
          <FilterFilled />
        </Popconfirm>
      </div> */}
      <Table
        {...props}
        onChange={onChangeFilter}
        columns={columnsTemp}
        components={components}
      />
    </div>
  );
};

export default ResizeableTable;

const FilterSelectHeader = memo(() => {
  return <>123</>;
});
