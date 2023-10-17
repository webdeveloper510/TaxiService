import Axios from "axios";

const API_URL = process.env.REACT_APP_API_URL

Axios.defaults.baseURL = API_URL

export const userLogin = async (data) => {
    console.log("dataaaaaaaaaaaaaaaa",data);
    return await Axios
      .post(`/admin/login`, data,{
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((error) => {
        console.log("error", error);
      });
  };