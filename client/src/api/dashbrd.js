import { axiosInstance } from ".";
export const Getbloodgrpdata = ()=>{
    return axiosInstance('get',`${process.env.REACT_APP_BACK}/api/dashboard/bloodgrpdata`)
}