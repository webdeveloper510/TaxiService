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

      return res.data;
    })
    .catch((error) => {
      console.log("GET_VEHICLE", error);
    });
};

export const getVehicleByType = async (type) => {
  return await Axios.get(`admin/get_vehicles_with_type/${type}`, {
    headers: {
      "x-access-token": token,
    },
  })
    .then((res) => {

      return res.data;
    })
    .catch((error) => {
      console.log("GET_VEHICLE", error);
    });
};
export const editVehicle = async (data,id) => {
  return await Axios.put(`admin/edit_vehicle/${id}`, data, {
    headers: {
      "x-access-token": token,
    },
  })
    .then((res) => {
      console.log(res, "edit vehicle");
      return res;
    })
    .catch((error) => {
      console.log("EDIT_VEHICLE", error);
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


export const getDriver = async(role) => {
  return await Axios.get(`admin/get_drivers${role=="super"?"_super":""}`,{
    headers: {
      "x-access-token": token,
    },
  }) 
  .then((res) => {
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
  })
   .then((res) => {
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
  }) 
  .then((res) => {
    console.log(res.data, "get Fare");
    return res.data;
  })
  .catch((error) => {
    console.log("GET_FARE", error);
  });
};


export const getTrip = async(data,search) => {
  return await Axios.post(`admin/get_trip/${data}`, {comment:search || ""}, {
    headers: {
      "x-access-token": token,
    },
  }) 
  .then((res) => {
    console.log(res.data, "get Trip");
    return res.data;
  })
  .catch((error) => {
    console.log("GET_TRIP", error);
  });
};
export const getTripSubAdmin = async(data,search) => {
  return await Axios.post(`subadmin/get_trip/${data}` , {comment: search || ""},{
    headers: {
      "x-access-token": token,
    },
  }) 
  .then((res) => {
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
  })
   .then((res) => {
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
  }) 
  .then((res) => {
    console.log(res.data, "getVehicleType");
    return res.data;
  })
  .catch((error) => {
    console.log("GET_VEHICLE_TYPE", error);
  });
};


export const addCompany = async(data) => {
  console.log("addCompany token is", data)
  return await Axios.post(`admin/add_sub_admin` ,data, {
    headers: {
      "x-access-token": token,
    },
  }) 
  .then((res) => {
    console.log(res.data, "addCompany");
    return res;
  })
  .catch((error) => {
    console.log("ADD_COMPANY", error);
  });
};
export const getCompany = async(data) => {
  console.log("getCompany is", data)
  return await Axios.post(`admin/search_company?role=${data.role}`,{name:data.name},{
    headers: {
      "x-access-token": token,
    },
  }) 
  .then((res) => {
    console.log(res.data, "get company");
    return res.data;
  })
  .catch((error) => {
    console.log("GET_COMPANY", error);
  });
};
export const deleteCompany = async(id) => {
  return await Axios.delete(`admin/delete_sub_admin/${id}`,{
    headers: {
      "x-access-token": token,
    },
  }) 
  .then((res) => {
    console.log(res.data, "delete company");
    return res.data;
  })
  .catch((error) => {
    console.log("DELETE_COMPANY", error);
  });
};

export const getCompanyById = async(id) => {
  return await Axios.get(`/admin/get_sub_admin_detail/${id}`,{
    headers: {
      "x-access-token": token,
    },
  }) 
  .then((res) => {
    console.log(res.data, "get company by id");
    return res.data;
  })
  .catch((error) => {
    console.log("GET_COMPANY_By_Id", error);
  });
};


export const deleteDriver = async(id) => {
  return await Axios.delete(`admin/remove_driver/${id}`,{
    headers: {
      "x-access-token": token,
    },
  }) 
  .then((res) => {
    console.log(res.data, "delete driver");
    return res.data;
  })
  .catch((error) => {
    console.log("DELETE_DRIVER", error);
  });
};
export const deleteFare = async(id) => {
  return await Axios.delete(`admin/delete_fare/${id}`,{
    headers: {
      "x-access-token": token,
    },
  }) 
  .then((res) => {
    console.log(res.data, "delete fare");
    return res.data;
  })
  .catch((error) => {
    console.log("DELETE_Fare", error);
  });
};
export const deleteVehicle = async(id) => {
  return await Axios.delete(`admin/delete_vehicle/${id}`,{
    headers: {
      "x-access-token": token,
    },
  }) 
  .then((res) => {
    console.log(res.data, "delete vehicle");
    return res.data;
  })
  .catch((error) => {
    console.log("DELETE_VEHICLE", error);
  });
};

export const getProfile = async(tokenFromLocal) => {
  console.log("GET_PROFILE_token", tokenFromLocal);
  return await Axios.get(`admin/get_token_detail`,{
    headers: {
      "x-access-token": tokenFromLocal,
    },
  }) 
  .then((res) => {
    console.log(res.data, "getProfile");
    return res.data;
  })
  .catch((error) => {
    console.log("GET_PROFILE", error);
  });
};

export const getVehicleById = async(id) => {
  return await Axios.get(`admin/get_vehicle_detail/${id}`,{
    headers: {
      "x-access-token": token,
    },
  }) 
  .then((res) => {
    console.log(res.data, "get vehicle by id");
    return res.data;
  })
  .catch((error) => {
    console.log("GET_VEHICLE_By_Id", error);
  });
};

export const getDriverById = async(id) => {
  return await Axios.get(`admin/get_driver_detail/${id}`,{
    headers: {
      "x-access-token": token,
    },
  }) 
  .then((res) => {
    console.log(res.data, "get driver by id");
    return res.data;
  })
  .catch((error) => {
    console.log("GET_DRIVER_By_Id", error);
  });
};

export const editDriver = async (data,id) => {
  return await Axios.put(`admin/update_driver/${id}`, data, {
    headers: {
      "x-access-token": token,
    },
  })
    .then((res) => {
      console.log(res, "edit driver");
      return res;
    })
    .catch((error) => {
      console.log("EDIT_DRIVER", error);
    });
};
export const editfare = async (data,id) => {
  return await Axios.put(`admin/edit_fare/${id}`, data, {
    headers: {
      "x-access-token": token,
    },
  })
    .then((res) => {
      console.log(res, "edit fare");
      return res;
    })
    .catch((error) => {
      console.log("EDIT_FARE", error);
    });
};
export const allocateDriver = async (data,id) => {
  return await Axios.put(`admin/alocate_driver/${id}`, data, {
    headers: {
      "x-access-token": token,
    },
  })
    .then((res) => {
      console.log(res, "alocate_driver");
      return res;
    })
    .catch((error) => {
      console.log("ALLOCATE_DRIVER", error);
    });
};


export const getRecentTrip = async(role,comment) => {
  return await Axios.post(`admin/${role? "get_recent_trip_super": "get_recent_trip"}`,{comment} , {
    headers: {
      "x-access-token": token,
    },
  }) 
  .then((res) => {
    console.log(res.data, "get Trip");
    return res.data;
  })
  .catch((error) => {
    console.log("GET_TRIP", error);
  });
};

// /admin/get_counts_dashboard
export const getCountDashboard = async() => {
  return await Axios.get(`admin/get_counts_dashboard` , {
    headers: {
      "x-access-token": token,
    },
  }) 
  .then((res) => {
    return res.data;
  })
  .catch((error) => {
    console.log("GET_TRIP", error);
  });
};
export const getCompanydetailId = async(id) => {
  return await Axios.get(`/admin/get_sub_admin_detail/${id}`,{
    headers: {
      "x-access-token": token,
    },
  }) 
  .then((res) => {
    return res.data;
  })
  .catch((error) => {
    console.log("error", error);
  });
};


export const editCompanyDetail = async (id, data) => {
  return await Axios.put(`admin/edit_sub_admin/${id}`, data, {
    headers: {
      "x-access-token": token,
    },
  })
    .then((res) => {
      console.log(res, "edit driver");
      return res;
    })
    .catch((error) => {
      console.log("EDIT_DRIVER", error);
    });
};

export const getTripCompleted = async() => {
  return await Axios.get(`subadmin/get_counts_dashboard` , {
    headers: {
      "x-access-token": token,
    },
  }) 
  .then((res) => {
    return res.data;
  })
  .catch((error) => {
    console.log("GET_TRIP", error);
  });
};
export const deleteTrips = async(id) => {
  return await Axios.delete(`subadmin/delete_trip/${id}`,{
    headers: {
      "x-access-token": token,
    },
  }) 
  .then((res) => {
    console.log(res.data, "delete company");
    return res.data;
  })
  .catch((error) => {
    console.log("DELETE_COMPANY", error);
  });
};

export const getTripById = async(id) => {
  return await Axios.get(`admin/get_trip_detail/${id}`,{
    headers: {
      "x-access-token": token,
    },
  }) 
  .then((res) => {
    console.log(res.data, "delete company");
    return res.data;
  })
  .catch((error) => {
    console.log("DELETE_COMPANY", error);
  });
};

export const addLinkTrip = async (data) => {
  return await Axios.post(`admin/add_trip_link`, data, {
    headers: {
      "x-access-token": token,
    },
  })
    .then((res) => {
      console.log(res, " addLinkTrip");
      return res;
    })
    .catch((error) => {
      console.log("addLinkTrip", error);
    });
};
export const tripsUpdate = async (id,data) => {
  return await Axios.put(`subadmin/edit_trip/${id}`, data, {
    headers: {
      "x-access-token": token,
    },
  })
    .then((res) => {
      console.log(res, "tripsUpdate");
      return res;
    })
    .catch((error) => {
      console.log("tripsUpdate", error);
    });
};
export const sendForgotEmail = async (email) => {
  return await Axios.post(`admin/send_otp`, {email}, {
    headers: {
      "x-access-token": token,
    },
  })
    .then((res) => {
      console.log(res, "sendForgotEmail");
      return res;
    })
    .catch((error) => {
      console.log("sendForgotEmail error", error);
    });
};
export const confirmOtp = async (data) => {
  return await Axios.post(`admin/verify_otp`, data, {
    headers: {
      "x-access-token": token,
    },
  })
    .then((res) => {
      console.log(res, "confirmOtp");
      return res;
    })
    .catch((error) => {
      console.log("confirmOtp error", error);
    });
};
export const changeForgotPass = async (data) => {
  return await Axios.post(`admin/forgot_password`, data, {
    headers: {
      "x-access-token": token,
    },
  })
    .then((res) => {
      console.log(res, "changeForgotPass");
      return res;
    })
    .catch((error) => {
      console.log("changeForgotPass error", error);
    });
};
export const changePass = async (data) => {
  return await Axios.post(`/admin/reset_password`, data, {
    headers: {
      "x-access-token": token,
    },
  })
    .then((res) => {
      console.log(res, "changePass");
      return res;
    })
    .catch((error) => {
      console.log("changePass error", error);
    });
};
export const requestBookingTrip = async (id) => {
  return await Axios.get(`admin/send_request_trip/${id}`, {
    headers: {
      "x-access-token": token,
    },
  })
    .then((res) => {
      console.log(res, "requestBookingTrip");
      return res;
    })
    .catch((error) => {
      console.log("requestBookingTrip error", error);
    });
};


export const getPastTripsdriver = async() => {
  return await Axios.get(`driver/get_trips_for_driver/completed` , {
    headers: {
      "x-access-token": token,
    },
  }) 
  .then((res) => {
    console.log("response post trips driver", res)
    return res.data;    
  })
  .catch((error) => {
    console.log("GET_TRIP", error);
  });
};