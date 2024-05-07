import { Button, Form, Input, Radio, message } from "antd";

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OrgHosForm from "./OrgHosForm";
import { signup } from "../../api/users";
import { useDispatch } from "react-redux";
import { Setloading } from "../../redux/loaderSlice";
import { antdvalidations } from "../../components/validation";

const Signup = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [type, setType] = useState("donor");
  const onFinish = async (values)=>{
    try {
      dispatch(Setloading(true))
      const response = await signup({...values,type})
      dispatch(Setloading(false))
      if (response.success) {
        message.success(response.message)
        navigate('/')
      } else {
        console.log(values)
      }
    } catch (error) {
      dispatch(Setloading(false))
      console.log(error)
    }
  }
  return (
    <div className="bg-primary flex h-full items-center justify-center">
      <Form
        layout="vertical"
        className="bg-white shadow rounded grid grid-cols-2 p-5 gap-5 md:w-1/2 w-screen" onFinish={onFinish}
      >
        <h1 className="col-span-2 uppercase">
          <span className="text-primary">{type} - Registration</span>
          <hr />
        </h1>
        <Radio.Group name="type" value={type} className="col-span-2" onChange={(e) => setType(e.target.value)}>
          <Radio value={"donor"}>Donor</Radio>
          <Radio value={"hospital"}>Hospital</Radio>
          <Radio value={"organization"}>Organization</Radio>
        </Radio.Group>
        {type === "donor" && (
          <>
            <Form.Item label="Name" name={'name'} rules={antdvalidations()}>
              <Input />
            </Form.Item>
            <Form.Item label="Email" name={'email'} rules={antdvalidations()}>
              <Input type="email" />
            </Form.Item>
            <Form.Item label="Phone" name={'phone'} rules={antdvalidations()}>
              <Input />
            </Form.Item>
            <Form.Item label="Password" name={'password'} rules={antdvalidations()}>
              <Input type="password" />
            </Form.Item>
            
          </>
        )}
        {type!=="donor" && <><OrgHosForm type={type}/></>}
        <Button htmlType="submit" type="primary" className="rounded-none h-10 col-span-2">
          Register
        </Button>
        <Link
          to={"/login"}
          className="col-span-2 text-center text-gray-700 underline hover:underline hover:text-gray-700"
        >
          Already Have an Account? Login
        </Link>
      </Form>
    </div>
  );
};

export default Signup;
