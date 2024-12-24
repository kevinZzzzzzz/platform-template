import { Checkbox, Col, Form, Input, Row, Select } from "antd";
import React, { useState, useEffect, memo } from "react";
import styles from "./index.module.scss";

function EditClient(props: any) {
  return (
    <div className={styles.EditClient}>
      <div className={styles.EditClient_header}>
        <h5>基本信息</h5>
        <Form name="basic" layout="vertical" autoComplete="off">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="客户名称"
                name="customerName"
                rules={[
                  {
                    required: true,
                    message: "Please input your customerName!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="客户来源" name="source">
                <Select placeholder={"请选择"} options={[]} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="手机" name="tel">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="电话" name="tel">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="网址" name="tel">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="邮箱" name="tel">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="客户行业" name="tel">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="客户级别" name="tel">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="下次联系时间" name="tel">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="备注" name="tel">
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
}
export default memo(EditClient);
