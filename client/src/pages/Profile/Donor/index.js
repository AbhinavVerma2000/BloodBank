import React from 'react'
import { useDispatch } from 'react-redux';
import { Setloading } from '../../../redux/loaderSlice';
import { GetAllDonorOrg} from '../../../api/inventory';
import { Table, message } from 'antd';
import moment from 'moment';

const Donor = () => {
    const [data, setData] = React.useState([]);
    const dispatch = useDispatch()
    const getData = async () => {
        try {
          dispatch(Setloading(true));
          const response = await GetAllDonorOrg();
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
        title: "Name",
        dataIndex: "name"
      },
    {
        title: "Email",
        dataIndex: "email"
    },{
        title: "Phone",
        dataIndex: "phone"
    },{
        title: "Date",
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

export default Donor
