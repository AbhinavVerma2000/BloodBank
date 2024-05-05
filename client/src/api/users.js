import { axiosInstance } from ".";

export const login = async (payload) => {
  const response = await axiosInstance("post",`${process.env.REACT_APP_BACK}/api/users/login`, payload)
  return response
};
export const signup = async (payload) => {
  const response = await axiosInstance("post",`${process.env.REACT_APP_BACK}/api/users/register`, payload)
  return response
};
export const getUserinfo = async () =>{
    const response = await axiosInstance("get",`${process.env.REACT_APP_BACK}/api/users/getuserinfo`)
    return response
}
export const GetAllOrgDonor = ()=>{
  return axiosInstance('get',`${process.env.REACT_APP_BACK}/api/users/getallorgdonor`)
}
export const GetAllOrgHos = ()=>{
  return axiosInstance('get',`${process.env.REACT_APP_BACK}/api/users/getallorghospital`)
}