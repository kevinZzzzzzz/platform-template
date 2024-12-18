import React, { useState, useRef, useEffect } from "react";
import styles from "./index.module.scss";
import { Button, Checkbox, Form, Input, message, Space } from "antd";
import {
  CopyrightOutlined,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { version } from "../../../package.json";

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const secreted = useRef(false); // 是否已加密
  const [loginForm] = Form.useForm(); // 搜索表单
  const initiaLoginVal = {
    username: "",
    password: "",
    remember: false,
  };
  const publicKey = useRef(""); // 公钥
  useEffect(() => {}, []);

  // 登录操作
  const onFinish = async (value: any) => {
    const { password, username } = value;
    navigate("/home");
  };
  const onFinishFailed = (error: any) => {
    console.error(error);
  };
  /* 
    记住密码操作
  */
  const rememberPwd = (event: any) => {
    const { checked } = event.target;
    localStorage.setItem("rememberPwd", checked);
  };
  // 修改密码框输入值后需要重新加密
  const changePwd = () => {
    secreted.current = false;
  };
  return (
    <div className={styles.loginPage}>
      <section className={styles.loginPage__ctx}>
        <div className={styles.loginPage__ctx__left}></div>
        <div className={styles.loginPage__ctx__right}>
          <h1>Welcome!</h1>
          <p>欢迎登录</p>
          <Form
            form={loginForm}
            name="loginForm"
            style={{ width: "100%", marginTop: "41px" }}
            initialValues={initiaLoginVal}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: "请输入账号!" }]}
            >
              <Input
                style={{ height: "48px" }}
                prefix={
                  <UserOutlined
                    className="site-form-item-icon"
                    style={{ color: "#1890FF" }}
                  />
                }
                placeholder="请输入账号"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: "请输入密码!" }]}
            >
              <Input.Password
                style={{ height: "48px" }}
                onChange={changePwd}
                prefix={
                  <LockOutlined
                    className="site-form-item-icon"
                    style={{ color: "#1890FF" }}
                  />
                }
                placeholder="请输入密码"
              />
            </Form.Item>

            <Space className={styles.loginBox__checked}>
              <Form.Item
                style={{ margin: 0 }}
                name="remember"
                valuePropName="checked"
              >
                <Checkbox onChange={rememberPwd}>记住密码</Checkbox>
              </Form.Item>
            </Space>

            <Form.Item>
              <Button
                style={{ width: "100%", height: "48px", marginTop: "24px" }}
                type="primary"
                htmlType="submit"
              >
                登录
              </Button>
            </Form.Item>
          </Form>
          <h6>版本：V{version}</h6>
        </div>
      </section>
    </div>
  );
}

export default LoginPage;
