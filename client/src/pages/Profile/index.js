import { Tabs } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import Inventory from "./Inventory/index";
import Donor from "./Donor";
import Hospital from "./Hospital";
import Organization from "./Organization";
import InvTable from "../../components/invTable";


const Profile = () => {
  const { currentUser } = useSelector((state) => state.users);

  return (
    <div>
      <Tabs>
        {currentUser.type === "organization" && (
          <>
            <Tabs.TabPane tab="Inventory" key={"1"}>
              <Inventory />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Donors" key={"2"}>
              <Donor />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Hospitals" key={"3"}>
              <Hospital />
            </Tabs.TabPane>
          </>
        )}
        {currentUser.type === "donor" && (
          <>
            <Tabs.TabPane tab="Donations" key={"1"}>
            <InvTable type={'donor'} filters={{inventorytype: 'in', donor: currentUser._id}}/>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Organizations" key={"2"}>
              <Organization type={'donor'} />
            </Tabs.TabPane>
          </>
        )}
        {currentUser.type === "hospital" && (
          <>
            <Tabs.TabPane tab="Consumptions" key={"1"}>
              <InvTable type={'hospital'} filters={{inventorytype: 'out', hospital: currentUser._id}}/>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Organizations" key={"2"}>
              <Organization type='hospital'/>
            </Tabs.TabPane>
          </>
        )}
      </Tabs>
    </div>
  );
};

export default Profile;
