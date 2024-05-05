import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Setloading } from "../../../redux/loaderSlice";
import { GetAllOrgDonor, GetAllOrgHos } from "../../../api/users";
import { Modal, Table, message } from "antd";
import moment from "moment";
import InvTable from "../../../components/invTable";

const Organization = ({ type }) => {
  const [showmodal, setShowmodal] = React.useState(false);
  const { currentUser } = useSelector((state) => state.users);
  const [data, setData] = React.useState([]);
  const [selectedOrg, setSelectedOrg] = React.useState(null);
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      dispatch(Setloading(true));
      const response =
        type === "donor" ? await GetAllOrgDonor() : await GetAllOrgHos();
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
  const columns = [
    {
      title: "Name",
      dataIndex: "organizationName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (date) => moment(date).format("DD MMM YYYY hh:mm A"),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <span
          onClick={() => {
            setSelectedOrg(record);
            setShowmodal(true);
          }}
          className="underline text-base cursor-pointer"
        >
          History
        </span>
      ),
    },
  ];
  React.useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <Table columns={columns} dataSource={data} />
      {showmodal && <Modal
        title={type === "donor" ? "Donation History" : "Consumption History"}
        open={showmodal}
        centered
        onCancel={() => setShowmodal(false)}
      >
        <InvTable
          filters={{ organization: selectedOrg._id, [type]: currentUser._id }}
        />
      </Modal>}
    </div>
  );
};

export default Organization;
