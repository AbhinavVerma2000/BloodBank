import React from "react";
import { Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { antdvalidations } from "../../components/validation";

function OrgHosForm({ type }) {
  return (
    <>
      <Form.Item rules={antdvalidations()}
        label={type === "hospital" ? "Hospital Name" : "Organization Name"}
        name={type === "hospital" ? "hospitalName" : "organizationName"}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Owner" name={"owner"} rules={antdvalidations()}>
        <Input />
      </Form.Item>
      <Form.Item label="Email" name={'email'} rules={antdvalidations()}>
        <Input type="email" />
      </Form.Item>
      <Form.Item label="Phone" name={"phone"} rules={antdvalidations()}>
        <Input />
      </Form.Item>
      <Form.Item label="Password" name={"password"} rules={antdvalidations()}>
        <Input type="password" />
      </Form.Item>
      <Form.Item label="Website" name={"website"} rules={antdvalidations()}>
        <Input />
      </Form.Item>
      <Form.Item className="col-span-2" label="Address" name={"address"} rules={antdvalidations()}>
        <TextArea />
      </Form.Item>
    </>
  );
}

export default OrgHosForm;
