import React from 'react'
import { useDispatch } from 'react-redux';
import { Setloading } from '../../../redux/loaderSlice';
import { GetAllHos} from '../../../api/inventory';
import { Table, message } from 'antd';
import moment from 'moment';

const Hospital = () => {
    const [data, setData] = React.useState([]);
    const dispatch = useDispatch()
    const getData = async () => {
        try {
          dispatch(Setloading(true));
          const response = await GetAllHos();
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
      const columns = [{
        title: "Hospital Name",
        dataIndex: "hospitalName"
      },
    {
        title: "Email",
        dataIndex: "email"
    },{
        title: "Phone",
        dataIndex: "phone"
    },
    {
        title: "Address",
        dataIndex: "address"
    },{
        title: "Created At",
        dataIndex: "createdAt",
        render: (date)=>moment(date).format('DD MMM YYYY hh:mm A')
    }]
      React.useEffect(() => {
        getData();
      },[]);
  return (
    <div>
      <Table columns={columns} dataSource={data}/>
    </div>
  )
}

export default Hospital
