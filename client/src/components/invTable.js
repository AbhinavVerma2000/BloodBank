import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { Setloading } from "../redux/loaderSlice";
import { GetInvwithFilter } from '../api/inventory';
import { Table, message } from 'antd';
import moment from 'moment';

function InvTable({filters, type}) {
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
      render: (text, record)=>record.organization.organizationName
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      render: (date)=> moment(date).format('DD MMM YYYY hh:mm A')
    },
  ];
  const getData = async () => {
    try {
      dispatch(Setloading(true));
      const response = await GetInvwithFilter({filters});
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
      <Table columns={columns} dataSource={data}/>
    </div>
  )
}

export default InvTable