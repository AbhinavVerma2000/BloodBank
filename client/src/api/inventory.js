import { axiosInstance } from ".";
export const AddInventory = (data)=>{
    return axiosInstance('post', `${process.env.REACT_APP_BACK}/api/inventory/add`,data)
}
export const GetInventory = ()=>{
    return axiosInstance('get',`${process.env.REACT_APP_BACK}/api/inventory/get`)
}
export const GetAllDonorOrg = ()=>{
    return axiosInstance('get',`${process.env.REACT_APP_BACK}/api/users/getalldonors`)
}
export const GetAllHos = ()=>{
    return axiosInstance('get',`${process.env.REACT_APP_BACK}/api/users/getallhospitals`)
}
export const GetInvwithFilter = (data)=>{
    return axiosInstance('get',`${process.env.REACT_APP_BACK}/api/inventory/filter`, data)
}