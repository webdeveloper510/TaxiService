import Axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;
Axios.defaults.baseURL = API_URL;
let token = localStorage.getItem("token");

export const userLogin = async (data) => {
  const response = await Axios.post(`/admin/login`, data, {
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
    console.log("response userlogin >>>>>>>",response);
    token = response.data.jwtToken
    return response
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


export const getTrip = async(data) => {
  return await Axios.get(`admin/get_trip/${data}` , {
    headers: {
      "x-access-token": token,
    },
  }) .then((res) => {
    console.log(res.data, "get Trip");
    return res.data;
  })
  .catch((error) => {
    console.log("GET_TRIP", error);
  });
};



export const addTrip = async (data) => {
  return await Axios.post(`admin/add_trip` ,data , {
    headers: {
      "x-access-token": token,
    },
  }) .then((res) => {
    console.log(res, "add_trip");
    return res;
  })
  .catch((error) => {
    console.log("ADD_TRIP", error);
  });
}


export const getVehicleType = async() => {
  return await Axios.get(`admin/get_vehicle_types` , {
    headers: {
      "x-access-token": token,
    },
  }) .then((res) => {
    console.log(res.data, "getVehicleType");
    return res.data;
  })
  .catch((error) => {
    console.log("GET_VEHICLE_TYPE", error);
  });
};