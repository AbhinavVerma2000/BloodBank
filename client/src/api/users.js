import { axiosInstance } from ".";

export const login = async (payload) => {
  const response = await axiosInstance("post",`/api/users/login`, payload)
  console.log(process.env.REACT_APP_BACK)
  return response
};
export const signup = async (payload) => {
  const response = await axiosInstance("post",`/api/users/register`, payload)
  return response
};
export const getUserinfo = async () =>{
    const response = await axiosInstance("get",`/api/users/getuserinfo`)
    return response
}
export const GetAllOrgDonor = ()=>{
  return axiosInstance('get',`/api/users/getallorgdonor`)
}
export const GetAllOrgHos = ()=>{
  return axiosInstance('get',`/api/users/getallorghospital`)
}