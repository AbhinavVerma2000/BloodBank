import axios from "axios";
export const axiosInstance = async ( method, endpoint, payload ) => {
  try {
    const response = await axios({
      method,
      url: endpoint,
      data: payload,
      adapter:["xhr","http","https"],
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      httpsAgent:{origin: ''}
    });
    return response.data;
  } catch (error) {
    return error;
  }
};
