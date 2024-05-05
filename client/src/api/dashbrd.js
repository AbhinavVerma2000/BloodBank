import { axiosInstance } from ".";
export const Getbloodgrpdata = ()=>{
    return axiosInstance('get',`/api/dashboard/bloodgrpdata`)
}