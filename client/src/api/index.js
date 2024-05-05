import axios from "axios";
export const axiosInstance = async ( method, endpoint, payload ) => {
  try {
    const response = await axios({
      baseURL: process.env.REACT_APP_BACK,
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
