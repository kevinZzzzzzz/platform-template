import { Button, Col, Form, Input, Row, Select, Space } from "antd";
import React, { useState, useEffect } from "react";

function FormComp(props: any) {
  return (
    <>
      <div className="fixBottomLayout">
        <div className="fixBottomLayout_header">
          <h1>编辑</h1>
        </div>
        <div className="fixBottomLayout_child">
          <Form name="basic" layout="vertical" autoComplete="off">
            <Row gutter={24}>
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
          </Form>
        </div>
        <div className="fixBottomLayout_footer">
          <Space align="center">
            <Button>重 置</Button>
            <Button type="primary">保 存</Button>
          </Space>
        </div>
      </div>
    </>
  );
}
export default FormComp;
