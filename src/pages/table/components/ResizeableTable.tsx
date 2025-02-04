import React, { useEffect, useState, useMemo } from "react";
import { Table } from "antd";
// import "antd/dist/antd.css";
import { Resizable } from "react-resizable";
import "./resizeable-table.scss";

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
  filterHeader: boolean;
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
  const [columns, setColumns] = useState(
    props.filterHeader ? [] : props.columns
  );
  const [filterHeader, setFilterHeader] = useState([]);
  useEffect(() => {
    console.log(props.filterHeader, " props.filterHeader && ----");
    handleFilterTableHeader(true);
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
  const handleFilterTableHeader = (init = false, filters = []) => {
    if (!props.filterHeader) return false;
    if (init) {
      const columnsTemp = props.columns;
      const filterHeaderTemp = columnsTemp
        .slice(0, columnsTemp.length - 1)
        .map((a) => {
          return {
            text: a.title,
            value: a.title,
          };
        });
      setFilterHeader(filterHeaderTemp);
      columnsTemp[columnsTemp.length - 1].filters = filterHeaderTemp;
      columnsTemp[columnsTemp.length - 1].filterResetToDefaultFilteredValue =
        true;
      columnsTemp[columnsTemp.length - 1].defaultFilteredValue = columnsTemp[
        columnsTemp.length - 1
      ].filteredValue = filterHeaderTemp.map((d) => d.value);
      columnsTemp[columnsTemp.length - 1].filterSearch = true;
      columnsTemp[columnsTemp.length - 1].filterOnClose = true;
      setColumns(columnsTemp);
    } else {
      const last = props.columns[props.columns.length - 1];
      const columnsTemp = props.columns.filter((d) =>
        filters.includes(d.title)
      );
      columnsTemp.push(last);
      columnsTemp[columnsTemp.length - 1].filteredValue = filterHeader
        .filter((d) => filters.includes(d.value))
        .map((d) => d.value);
      setColumns(columnsTemp);
    }
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
    if (filters) {
      // console.log(pagination, filters);
      handleFilterTableHeader(false, filters.follow);
    }
  };
  return (
    <Table
      {...props}
      onChange={onChangeFilter}
      columns={columnsTemp}
      components={components}
    />
  );
};

export default ResizeableTable;
