import { message } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Setloading } from '../../redux/loaderSlice'
import { Getbloodgrpdata } from '../../api/dashbrd'

const Home = () => {
  const {currentUser} = useSelector((state)=>state.users)
  const [bldgrpdata, setBldgrpdata] = React.useState([])
  const dispatch = useDispatch()
  const GetUserName = () => {
    if (currentUser?.type === "donor") return currentUser.name;
    if (currentUser?.type === "organization")
      return currentUser.organizationName;
    if (currentUser?.type === "hospital") return currentUser.hospitalName;
  };
  const getData = async()=>{
    try {
      dispatch(Setloading(true))
      const response = await Getbloodgrpdata()
      dispatch(Setloading(false))
      if (response.success) {
        setBldgrpdata(response.data)
      } else {
        throw new Error(response.message)
      }
    } catch (error) {
      message.error(error.message)
      dispatch(Setloading(false))
    }
  }
  useEffect(()=>{
    getData()
  },[])
  const colors=['#CE5959', "#1A5F7A",'#B8621B','#245953','#2C3333','#4E6E92', '#A84448','#635985']
  return (
    <div>
      <span className="text-primary text-2xl">Welcome {GetUserName()}</span>
      {currentUser.type==='organization' && <div className="grid grid-cols-4 gap-5 mt-5">{bldgrpdata.map((bloodgrp, index)=>{
        return <div key={index} style={{backgroundColor: colors[index]}} className="p-5 flex justify-between text-white rounded items-center">
          <h1 className='text-5xl'>{bloodgrp.bloodgrp}</h1>
          <div className='flex flex-col justify-between gap-2'>
            <div className="flex justify-between gap-5">
              <span>Total In</span>
              <span>{bloodgrp.totalIn} ml</span>
            </div>
            <div className="flex justify-between gap-5">
              <span>Total Out</span>
              <span>{bloodgrp.totalOut} ml</span>
            </div>
            <div className="flex justify-between gap-5">
              <span>Available</span>
              <span>{bloodgrp.available} ml</span>
            </div>
          </div>
        </div>
      })}</div>}
    </div>
  )
}

export default Home
