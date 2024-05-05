import { Form, Input, Modal, Radio, message } from "antd";
import React, { useState } from "react";
import { antdvalidations } from "../../../components/validation";
import { useDispatch, useSelector } from "react-redux";
import { Setloading } from "../../../redux/loaderSlice";
import { AddInventory } from "../../../api/inventory";

const Invform = ({ open, setOpen, reloadData }) => {
  const {currentUser} = useSelector((state)=>state.users)
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const [inventorytype, setInventorytype] = useState("in");
  const onFinish = async(values)=>{
    try {
      dispatch(Setloading(true))
      const response = await AddInventory({...values, inventorytype,organization: currentUser._id})
      dispatch(Setloading(false))
      if (response.success) {
        message.success('Inventory Added Successfully')
        setOpen(false)
        reloadData()
      } else {
        message.error(response.message)
      }
    } catch (error) {
      message.error(error.message)
      dispatch(Setloading(false))
    }
  }
  return (
    <div>
      <Modal
        title="Add Inventory"
        open={open} onOk={()=>form.submit()}
        onCancel={() => setOpen(false)}
        centered
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item>
            <Radio.Group
              value={inventorytype}
              onChange={(e) => setInventorytype(e.target.value)}
            >
              <Radio value={"in"}>In</Radio>
              <Radio value={"out"}>Out</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item rules={antdvalidations()} label="Blood Group" name={'bloodgrp'}>
            <select name="" id="">
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </Form.Item>
          <Form.Item rules={antdvalidations()} label={inventorytype==='out'?'Hospital Email': 'Donor Email'} name={'email'}><Input type="email"/></Form.Item>
          <Form.Item rules={antdvalidations()} label='Quantity (ml)' name={'quantity'}><Input type="number"/></Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Invform;
