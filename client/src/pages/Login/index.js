import { Button, Form, Input, Radio,message } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../api/users";
import { useDispatch } from "react-redux";
import { Setloading } from "../../redux/loaderSlice";
import { antdvalidations } from "../../components/validation";

const Login = () => {
  const [type, setType] = useState("donor");
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onFinish = async (values) => {
    try {
      dispatch(Setloading(true))
      const response = await login({...values, type})
      dispatch(Setloading(false))
      if (response.success) {
        message.success(response.message)
        localStorage.setItem('token', response.data)
        navigate('/')
      } else {
        console.log(response)
      }
    } catch (error) {
      console.log(error.message)
      dispatch(Setloading(false))
    }
  };
  useEffect(()=>{
    if (localStorage.getItem('token')) {
      navigate('/')
    }
  },[navigate])
  return (
    <div className="bg-primary flex h-screen items-center justify-center">
      <Form
        layout="vertical"
        className="bg-white shadow rounded p-5 gap-5 w-1/3 grid"
        onFinish={onFinish}
      >
        <h1 className="uppercase">
          <span className="text-primary">{type} - Login</span>
          <hr />
        </h1>
        <Radio.Group
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <Radio value={"donor"}>Donor</Radio>
          <Radio value={"hospital"}>Hospital</Radio>
          <Radio value={"organization"}>Organization</Radio>
        </Radio.Group>

        <Form.Item label="Email" name={"email"} rules={antdvalidations()}>
          <Input type="email" />
        </Form.Item>

        <Form.Item label="Password" name={"password"} rules={antdvalidations()}>
          <Input type="password" />
        </Form.Item>

        <Button
          htmlType="submit"
          type="primary"
          className="rounded-none w-full h-10"
        >
          Login
        </Button>
        <Link
          to={"/signup"}
          className="text-center text-gray-700 underline hover:underline hover:text-gray-700"
        >
          Don&apos;t Have an Account? Register Now
        </Link>
      </Form>
    </div>
  );
};

export default Login;
