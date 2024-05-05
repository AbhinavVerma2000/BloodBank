import { axiosInstance } from ".";
export const AddInventory = (data)=>{
    return axiosInstance('post', `/api/inventory/add`,data)
}
export const GetInventory = ()=>{
    return axiosInstance('get',`/api/inventory/get`)
}
export const GetAllDonorOrg = ()=>{
    return axiosInstance('get',`/api/users/getalldonors`)
}
export const GetAllHos = ()=>{
    return axiosInstance('get',`/api/users/getallhospitals`)
}
export const GetInvwithFilter = (data)=>{
    return axiosInstance('get',`/api/inventory/filter`, data)
}