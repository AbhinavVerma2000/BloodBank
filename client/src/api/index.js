import axios from "axios";
export const axiosInstance = async ( method, endpoint, payload ) => {
  try {
    const response = await axios({
      baseURL:"https://blood-bank-77pn.vercel.app/",
      method,
      url: endpoint,
      data: payload,
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
  });
    return response.data;
  } catch (error) {
    return error;
  }
};
