import { message } from "antd";
import React, { useEffect } from "react";
import { getUserinfo } from "../api/users";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetCurrUser } from "../redux/userSlice";
import { Setloading } from "../redux/loaderSlice";

function Protectedpages({ children }) {
  const { currentUser } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getuserinfo = async () => {
    try {
      dispatch(Setloading(true));
      const response = await getUserinfo();
      dispatch(Setloading(false));
      if (response.success) {
        console.log(response.data);
        message.success(response.message);
        dispatch(SetCurrUser(response.data));
      } else {
        console.log(response.data);
      }
    } catch (error) {
      console.log(error.message);
      message.error(error.message);
      dispatch(Setloading(false));
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getuserinfo();
    } else {
      navigate("/login");
    }
  }, [navigate]);
  const GetUserName = () => {
    if (currentUser?.type === "donor") return currentUser.name;
    if (currentUser?.type === "organization")
      return currentUser.organizationName;
    if (currentUser?.type === "hospital") return currentUser.hospitalName;
  };
  return (
    currentUser && (
      <div className="w-screen h-screen">
        <header className="flex justify-between items-center bg-primary text-white w-full">
          <p onClick={()=>navigate('/')} className="font-bold cursor-pointer pl-5">HemoHub Bloodbank</p>
          <div className="flex items-center pr-5">
          <i className="ri-shield-user-line text-2xl"></i>
          <div className="flex flex-col">
            <span className="mr-5 text-md cursor-pointer" onClick={()=>navigate('/profile')}>{GetUserName()}</span>
            <span className="text-xs">{currentUser.type.toUpperCase()}</span>
          </div>
          <i className="ri-logout-box-r-line text-2xl cursor-pointer" onClick={()=>{localStorage.removeItem('token')
        navigate('/login')}}></i>
          </div>
        </header>
        <div className="p-5">{children}</div>
      </div>
    )
  );
}

export default Protectedpages;
