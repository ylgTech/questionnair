import React from "react";
import { Button, Card, Cell, Form, Loading, Popup } from "annar";
import { useMutation, useQueryClient } from "react-query";
import { fetchUserInfo, postUserInfo } from "../api";
import { UserInfo } from "../interfaces";

const Login = () => {
  const queryClient = useQueryClient();
  const { queryKey: userInfo } = fetchUserInfo();
  const { mutate, isLoading } = useMutation(postUserInfo, {
    onSuccess: () => {
      queryClient.invalidateQueries(userInfo);
    },
  });

  const handleFinish = (values: UserInfo) => {
    console.log("post user info: ", values);
    mutate(values);
  };

  return (
    <>
      <Card contentStyle={{ padding: "20px 0 20px" }}>
        <Form onFinish={handleFinish}>
          <Form.Item noStyle name="name" rules={[{ required: true }]}>
            <Cell.Input
              icon="people"
              label="姓名"
              // placeholder="Please enter"
              border={false}
            />
          </Form.Item>
          <Form.Item noStyle name="school" rules={[{ required: true }]}>
            <Cell.Input
              icon="discover"
              label="学院"
              // placeholder="Please enter"
              border={false}
            />
          </Form.Item>
          <Form.Item noStyle name="class" rules={[{ required: true }]}>
            <Cell.Input
              icon="group"
              label="班级"
              // placeholder="Please enter"
              border={false}
            />
          </Form.Item>
          <Form.Item
            noStyle
            name="phone"
            rules={[
              { pattern: /^1[3456789]\d{9}$/, message: "请输入11位手机号码" },
            ]}
          >
            <Cell.Input
              icon="phone"
              label="联系电话"
              // placeholder="Please enter"
              border={false}
            />
          </Form.Item>
          <Form.Item noStyle style={{ marginTop: 10, padding: "0 20px" }}>
            <Button
              type="primary"
              size="large"
              shape="square"
              look="secondary"
              block
              disabled={isLoading}
              loading={isLoading}
              nativeType="submit"
            >
              提交
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Popup open={isLoading} style={{ padding: "80px" }}>
        <Loading type="wave" color="#1890FF" />
      </Popup>
    </>
  );
};

export default Login;
