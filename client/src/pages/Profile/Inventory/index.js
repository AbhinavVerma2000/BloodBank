import React, { useState } from "react";
import { Button, Table, message } from "antd";
import Invform from "./Invform";
import { useDispatch } from "react-redux";
import { Setloading } from "../../../redux/loaderSlice";
import { GetInventory } from "../../../api/inventory";
import moment from 'moment'
const Inventory = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const columns = [
    {
      title: "Inventory Type",
      dataIndex: "inventorytype",
      render: (text)=>text.toUpperCase()
    },
    {
      title: "Blood Group",
      dataIndex: "bloodgrp",
    },
    {
      title: "Quantity (ml)",
      dataIndex: "quantity",
    },
    {
      title: "Reference",
      dataIndex: "reference",
      render: (text, record)=>{
        if (record.inventorytype==='in') {
          return record.donor.name
        } else {
          return record.hospital.hospitalName
        }
      }
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      render: (date)=> moment(date).format('DD MMM YYYY hh:mm A')
    },
  ];
  const [open, setOpen] = useState(false);
  const getData = async () => {
    try {
      dispatch(Setloading(true));
      const response = await GetInventory();
      dispatch(Setloading(false));
      if (response.success) {
        setData(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
      dispatch(Setloading(false));
    }
  };
  React.useEffect(() => {
    getData();
  },[]);
  return (
    <div>
      <div className="flex justify-end">
        <Button type="default" onClick={() => setOpen(true)}>
          Add to Inventory
        </Button>
      </div>
      <Table columns={columns} dataSource={data}/>
      {open && <Invform open={open} setOpen={setOpen} reloadData={getData}/>}
    </div>
  );
};

export default Inventory;
