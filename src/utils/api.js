import Axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;
Axios.defaults.baseURL = API_URL;
let token = localStorage.getItem("token");

export const userLogin = async (data) => {
  return await Axios.post(`/admin/login`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((error) => {
      console.log("USER-LOGIN", error);
    });
};

export const addVehicle = async (data) => {
  return await Axios.post(`admin/add_vehicle`, data, {
    headers: {
      "x-access-token": token,
    },
  })
    .then((res) => {
      console.log(res, "add vehicle");
      return res;
    })
    .catch((error) => {
      console.log("ADD_VEHICLE", error);
    });
};

export const getVehicle = async () => {
  return await Axios.get(`admin/get_vehicles`, {
    headers: {
      "x-access-token": token,
    },
  })
    .then((res) => {
      console.log(res.data, "get vehicle");
      return res.data;
    })
    .catch((error) => {
      console.log("GET_VEHICLE", error);
    });
};


export const addDriver = async (data) => {
  return await Axios.post(`admin/add_driver`, data, {
    headers: {
      "x-access-token": token,
    },
  })
    .then((res) => {
      console.log(res, "add driver");
      return res;
    })
    .catch((error) => {
      console.log("ADD_DRIVER", error);
    });
};


export const getDriver = async() => {
  return await Axios.get(`admin/get_drivers` , {
    headers: {
      "x-access-token": token,
    },
  }) .then((res) => {
    console.log(res.data, "get Driver");
    return res.data;
  })
  .catch((error) => {
    console.log("GET_DRIVER", error);
  });
};


export const addFare = async (data) => {
  return await Axios.post(`admin/add_fare` ,data , {
    headers: {
      "x-access-token": token,
    },
  }) .then((res) => {
    console.log(res, "add Fare");
    return res;
  })
  .catch((error) => {
    console.log("ADD_FARE", error);
  });
}



export const getFare = async() => {
  return await Axios.get(`admin/get_fares` , {
    headers: {
      "x-access-token": token,
    },
  }) .then((res) => {
    console.log(res.data, "get Fare");
    return res.data;
  })
  .catch((error) => {
    console.log("GET_FARE", error);
  });
};



