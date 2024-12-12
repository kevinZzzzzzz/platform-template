import { Table } from "antd";
import React, { useState, useEffect, memo } from "react";

function ContactPerson(props: any) {
  const [dataSource, setDataSource] = useState([]);
  const columns = [
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "手机",
      dataIndex: "tel",
      key: "tel",
    },
    {
      title: "职务",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "操作",
      dataIndex: "action",
      key: "action",
    },
  ];

  return <Table dataSource={dataSource} columns={columns} />;
}
export default memo(ContactPerson);
