import React, { useState, useEffect } from "react";
import AppHeader from "../../TopBar/AppHeader";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import moment from "moment";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
} from "@coreui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  getCompany,
  getDriver,
  getFare,
  getVehicle,
  getVehicleType,
} from "../../../utils/api";
import { addTrip } from "../../../utils/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import SuperSideBar from "../SiderNavBar/Sidebar";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { ClipLoader } from "react-spinners";
import * as geolib from "geolib";
import { distanceBetweenTwoPoints } from "../../../utils/helpingFunction";

const SuperRequestTrip = () => {
  const [selectedHotelAddress, setSelectedHotelAddress] = useState(null);
  const [refreshPrice, setRefreshPrice] = useState(false);
  const [fares, setFares] = useState(null);
  const [selectedFare, setSelectedFare] = useState(null);

  const [age, setAge] = useState("Select Vehicle Type");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  function customSetHours(date, hour) {
    if (date instanceof Date) {
      const newDate = new Date(date);
      newDate.setHours(hour);
      return newDate;
    } else {
      throw new Error("Invalid Date object");
    }
  }

  // Function to set the minute component of a Date object
  function customSetMinutes(date, minute) {
    if (date instanceof Date) {
      const newDate = new Date(date);
      newDate.setMinutes(minute);
      return newDate;
    } else {
      throw new Error("Invalid Date object");
    }
  }
  const navigate = useNavigate();

  const [pickupDate, setpickupDate] = useState(new Date());
  useEffect(() => {
    const today = new Date();
    if (pickupDate.toDateString() == today.toDateString()) {
      SetCurrentTime({
        hour: today.getHours(),
        minute: today.getMinutes() + 1,
      });
    } else {
      SetCurrentTime({
        hour: 0,
        minute: 0,
      });
    }
  }, [pickupDate]);
  const [currentTime, SetCurrentTime] = useState({
    hour: new Date().getHours(),
    minute: new Date().getMinutes() + 1,
  });
  const [passengers, setPassengers] = useState([
    // { name: "", email: "", phone: "", address: "" },
  ]);
  const [vehicle, setVehicle] = useState(null);
  const [inputData, setInputData] = useState({
    vehicle: "",
    customer: "",
    trip_from: { address: "", lat: null, log: null },
    trip_to: { address: "", lat: null, log: null },
    pick_up_date: new Date(),
    passenger_detail: [],
    commission_type: "Fixed",
    commission_value: "",
    comment: "",
    pay_option: "Cash",
    passengerCount: "1",
    name: "",
      phone: "",
      email: "",
      address: "",
  });
  const [price, setPrice] = useState("");
  const [passengerError, setPassengerError] = useState([
    {
      name: false,
      phone: false,
      email: false,
      address: false,
    },
  ]);
  const priceCalculator = async() => {
    let distance = null;
    if (inputData?.trip_from?.log && inputData?.trip_to?.log) {
      // distance = (
      //   geolib.getDistance(
      //     {
      //       latitude: inputData?.trip_from?.lat,
      //       longitude: inputData?.trip_from?.log,
      //     },
      //     {
      //       latitude: inputData?.trip_to?.lat,
      //       longitude: inputData?.trip_to?.log,
      //     }
      //   ) / 1000
      // ).toFixed(2);
      distance = await distanceBetweenTwoPoints({
        lat: inputData?.trip_from?.lat,
        lng: inputData?.trip_from?.log,
      },
      {
        lat: inputData?.trip_to?.lat,
        lng: inputData?.trip_to?.log,
      })
      console.log("🚀 ~ priceCalculator ~ distance:", distance)
    }
    if (distance && selectedFare) {
      const latestPrice = (distance * selectedFare?.vehicle_fare_per_km).toFixed(2);
      console.log("🚀 ~ priceCalculator ~ latestPrice:", latestPrice)
      setPrice(latestPrice.toString());
      
    } else {
      setPrice("0");
      
    }
  };
  const formValidation = (passengers) => {
    const data = [...passengers];
    var re = /\S+@\S+\.\S+/;
    const phoneRegex = /^[0-9]*$/;
    let valid = true;
    for (let index = 0; index < data.length; index++) {
      // const element = data[index];
      if (data[index].name == "") {
        data[index].nameCheck = "Name required";
        data[index].nameLengthCheck = "";
        valid = false;
      } else if (/^\d+$/.test(data[index].name)) {
        data[index].nameCheck = "Name should not be a number";
        data[index].nameLengthCheck = "";
        valid = false;
      } else if (data[index].name.length < 3) {
        data[index].nameLengthCheck = "Please enter valid name";
        data[index].nameCheck = "";
        valid = false;
      } else {
        data[index].nameCheck = "";
        data[index].nameLengthCheck = "";
        // valid = true;
      }

      if (data[index].email == "") {
        data[index].emailCheck = "Email required";
        data[index].emailFormat = "";
        valid = false;
      } else if (!re.test(data[index].email)) {
        data[index].emailFormat = "Invalid Email";
        data[index].emailCheck = "";
        valid = false;
      } else {
        data[index].emailCheck = "";
        data[index].emailFormat = "";
        // valid = true;
      }
      if (data[index].phone == "") {
        data[index].phoneCheck = "Phone required";
        data[index].phoneLengthCheck = "";
        valid = false;
      } else if (!phoneRegex.test(data[index].phone)) {
        data[index].phoneCheck = "Enter only digit";
        data[index].phoneLengthCheck = "";
        valid = false;
      } else if (
        data[index].phone.length < 7 ||
        data[index].phone.length > 16
      ) {
        data[index].phoneLengthCheck = "Please enter valid phone number";
        data[index].phoneCheck = "";
        valid = false;
      } else {
        data[index].phoneCheck = "";
        data[index].phoneLengthCheck = "";
        // valid = true;
      }
      if (data[index].address == "") {
        data[index].addressCheck = "Address required";
        data[index].addressLengthCheck = "";
        valid = false;
      } else if (
        data[index].address.length < 7 ||
        data[index].address.length > 50
      ) {
        data[index].addressLengthCheck = "Please enter valid address";
        data[index].addressCheck = "";
        valid = false;
      } else {
        data[index].addressCheck = "";
        data[index].addressLengthCheck = "";
        // valid = true;
      }
    }

    setPassengers(data);
    return valid;
  };

  const [errors, setErrors] = useState({
    vehicle: null,
    trip_from: null,
    trip_to: null,
    pick_up_date: null,
    customer: null,
    passenger_detail: [],
    commission_type: null,
    commission_value: null,
    comment: null,
    pay_option: null,
    passengerCount: null,
    name: null,
      phone: null,
      email: null,
      address: null,
  });

  const addPassenger = () => {
    setPassengers([
      ...passengers,
      { name: "", email: "", phone: "", address: "" },
    ]);
    setPassengerError([
      ...passengerError,
      {
        name: false,
        phone: false,
        email: false,
        address: false,
      },
    ]);
  };
  const handleBlur = (index, key) => {
    const newPassengersError = [...passengerError];
    newPassengersError[index][key] = true;
    setPassengerError(newPassengersError);
    console.log(passengerError);
  };
  const removePassenger = (index) => {
    console.log(index, "index for reamovel");
    const updatedPassengers = passengers.filter((_, i) => i !== index);
    setPassengers(updatedPassengers);
    const errorArray = passengerError.filter((_, i) => i !== index);
    setPassengerError(errorArray);
  };
  const [customer, setCustomer] = useState([]);
  useEffect(() => {
    let vehicleFromApi = [];
    let fareFromApi = [];
    const newVehicle = [];
    getVehicleType().then((res) => {
      console.log(res.result, "vehicleType");
      if (res?.code === 200) {
        // setVehicle(res.result);
        vehicleFromApi = res.result;
      }
      getFare().then((res) => {
        console.log(res?.result, "fares");
        if (res?.code === 200) {
          setFares(res?.result);
          fareFromApi = res.result;
        }
        
        vehicleFromApi.forEach((item) => {
          console.log("res2.result", fareFromApi);
          fareFromApi.forEach((fare) => {
            if (fare.vehicle_type == item.name) {
              newVehicle.push(item);
              setVehicle(newVehicle);
            }
          });
        });
      });
    });
    
    
    getCompany({ role: "HOTEL", name: "" })
      .then((res) => {
        console.log(res?.result, "customer");

        if (res?.code === 200) {
          const values = res?.result.filter((item) => item.status);
          if (values) setCustomer(values);
        } else {
        }
      })
      .catch((err) => {});
  }, []);
  useEffect(()=>{priceCalculator()}, [refreshPrice])
  const inputHandler = (e) => {
    if (e.target.value.length < 1) {
      setErrors({ ...errors, [e.target.name]: true });
    } else {
      setErrors({ ...errors, [e.target.name]: false });
    }
    console.log("errors====>>>>", errors);
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };

  const addOnChangeHandler = (e, index) => {
    let arr = passengers;
    console.log(passengers);
    let obj = arr[index];
    obj[e.target.name] = e.target.value;
    arr[index] = obj;
    setPassengers([...arr]);
    const isValid = formValidation(passengers);
    // const errorRes = formValidation(passengers);
    // if(errorRes){
    //   console.log("success")
    // }else{
    //   console.log("error")
    // }
  };
  const [formLoader, setFormLoader] = useState(false);

  const adddata = () => {
    console.log("inputData.commission_value", inputData.commission_value);
    let data = inputData;
    let valid = true;
    const passError = passengerError.map(() => {
      return {
        name: true,
        phone: true,
        email: true,
        address: true,
      };
    });
    setPassengerError(passError);
    let newErrors = { ...errors };
    const errorRes = formValidation(passengers);
    console.log("data beafore vehicle", newErrors, inputData.commission_value);
    if (
      !data.trip_from.lat ||
      !data.trip_from.log ||
      data.trip_from.address.length < 1
    ) {
      console.log("enter valid trip from");
      valid = false;
      newErrors.trip_from = "Please enter valid trip from address";
    }
    if (
      !data.trip_to.lat ||
      !data.trip_to.log ||
      data.trip_to.address.length < 1
    ) {
      valid = false;
      newErrors.trip_to = "Please enter valid trip to address";
    }
    if (
      data.trip_from.address === data.trip_to.address ||
      (data.trip_from.lat == data.trip_to.lat &&
        data.trip_from.log == data.trip_to.log)
    ) {
      valid = false;
      newErrors.trip_to = "Please select different trip to address";
    }
    if (data.vehicle.length < 1) {
      valid = false;
      newErrors.vehicle = "Please select valid vehicle";
    }

    if (data.customer.length < 1) {
      valid = false;
      newErrors.customer = "Please select valid customer";
    }
    if (data.comment.length > 20) {
      valid = false;
      newErrors.comment = "Max 20 character allowed";
    }
    if (inputData.pick_up_date.length < 1) {
      valid = false;
      newErrors.pick_up_date = "Please select valid pick-up date";
    }
    if (inputData.commission_value.length < 1) {
      valid = false;
      newErrors.commission_value = "Please enter commission value";
    }

    if (parseFloat(inputData.commission_value) <= 0) {
      valid = false;
      newErrors.commission_value = "Value should be greater than 0";
    }
    if (
      inputData.commission_type == "Percentage" &&
      parseFloat(inputData.commission_value) > 100
    ) {
      valid = false;
      newErrors.commission_value = "Value should be less than equal 100";
    }
    if (
      inputData.commission_type == "Fixed" &&
      parseFloat(price) > 0 &&
      parseFloat(inputData.commission_value) > parseFloat(price)
    ) {
      valid = false;
      newErrors.commission_value = "Value should be less than trip price";
    }
    if (!valid) {
      setErrors(newErrors);
      toast.warning("Please Enter Valid Detail", {
        position: "top-right",
        autoClose: 1000,
      });
      return console.log(errors);
    }
    data.customerDetails = {
      name: inputData.name,
      address: inputData.address,
      email: inputData.email,
      phone: inputData.phone,
    }
    data.passenger_detail = passengers;
    console.log("data beafore api", data);
    if (errorRes) {
      data.vehicle_type = data.vehicle;
      delete data.vehicle;
      data.pickup_date_time = data.pick_up_date;
      delete data.pick_up_date;
      data.created_by = data.customer;
      delete data.customer;
      if (price.length > 0) {
        data.price = parseFloat(price);
      }
      data.commission = {
        commission_type: data.commission_type,
        commission_value: data.commission_value,
      };
      delete data.commission_value;
      delete data.commission_type;
      

      addTrip(data)
        .then((res) => {
          setFormLoader(true);
          console.log("response---->>>>", res);
          if (res.data.code === 200) {
            toast.success(`${res.data.message}`, {
              position: "top-right",
              autoClose: 1000,
            });
            navigate("/taxi/trips/pendingtrips");
          } else {
            toast.warning(`${res.data.message}`, {
              position: "top-right",
              autoClose: 1000,
            });
          }
        })
        .finally(() => setFormLoader(false));
    } else {
      toast.warning("Please Enter Passenger Detail", {
        position: "top-right",
        autoClose: 1000,
      });
    }
    // setFormLoader(false)
  };
  const [tripFrom, setTripFrom] = useState("");
  const [tripFromCoordinates, setTripFromCoordinates] = useState(null);
  const [tripTo, setTrimTo] = useState("");
  const [tripToCoordinates, setTripToCoordinates] = useState(null);
  const handleSelectTripFrom = async (selectedAddress) => {
    try {
      const results = await geocodeByAddress(selectedAddress);
      const latLng = await getLatLng(results[0]);
      setErrors({ ...errors, trip_from: null });
      const newInputData = inputData;
      inputData.trip_from.address = selectedAddress;
      inputData.trip_from.lat = latLng.lat;
      inputData.trip_from.log = latLng.lng;
      setInputData(newInputData);
      setTripFrom(selectedAddress);
      setTripFromCoordinates(latLng);
      setRefreshPrice(!refreshPrice)
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleSelectTripTo = async (selectedAddress) => {
    try {
      const results = await geocodeByAddress(selectedAddress);
      const latLng = await getLatLng(results[0]);
      setErrors({ ...errors, trip_to: null });
      const newInputData = inputData;
      inputData.trip_to.address = selectedAddress;
      inputData.trip_to.lat = latLng.lat;
      inputData.trip_to.log = latLng.lng;
      setInputData(newInputData);
      setTrimTo(selectedAddress);
      setTripToCoordinates(latLng);
      setRefreshPrice(!refreshPrice)
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handlePriceChange = (event) => {
    const inputValueRegex = /^\d*\.?\d{0,2}$/; // Regular expression to allow up to 2 decimal places

    if (inputValueRegex.test(event.target.value) || event.target.value === "") {
      setPrice(event.target.value);
    }
  };
  const setFareOnVehicleType = (vehicle_type) => {
    fares.forEach((fare) => {
      if (fare.vehicle_type == vehicle_type) {
        setSelectedFare(fare);
        console.log("selectecd fare is", fare);
      }
    });
  };
  return (
    <>
      <div className="container-fluidd">
        <div className="col-md-12">
          <div>
            <SuperSideBar />

            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
              <AppHeader />
              <div
                className="body flex-grow-1 px-3"
                style={{ paddingBottom: "20px" }}
              >
                <h1 class="heading-for-every-page">Request Trip</h1>
                <div class="active-trip-outer">
                  <CRow>
                    <CCol xs={12}>
                      <CCard className="mb-4">
                        <CCardBody>
                          <CForm className="row g-3">
                            <CCol md={6}>
                              <CFormLabel htmlFor="inputvehicletype">
                                Vehicle Type
                                <span class="asterisk-mark">*</span>
                              </CFormLabel>

                              <CFormSelect
                                name="vehicle"
                                onChange={(data) => {
                                  console.log("🚀 ~ SuperRequestTrip ~ data:", data)
                                  
                                  setFareOnVehicleType(data.target.value);
                                  setInputData({
                                    ...inputData,
                                    vehicle: data.target.value,
                                  });
                                  setRefreshPrice(!refreshPrice)
                                  if (data.target.value < 1) {
                                    setErrors({
                                      ...errors,
                                      vehicle: "Please select vehicle",
                                    });
                                  } else {
                                    setErrors({ ...errors, vehicle: null });
                                  }
                                }}
                              >
                                <option default>Select Vehicle Type</option>
                                {vehicle?.map((e, i) => {
                                  return (
                                    <>
                                      <option value={e.name}>{e.name}</option>
                                    </>
                                  );
                                })}
                               
                              </CFormSelect>
                              {vehicle?.length == 0 &&  <span
                                  style={{ color: "red" }}
                                  className="text-danger"
                                >
                                  You should first add vehicle fare price before requsting a trip.
                                </span>}
                              {errors.vehicle && (
                                <span
                                  style={{ color: "red" }}
                                  className="text-danger"
                                >
                                  {errors.vehicle}
                                </span>
                              )}
                            </CCol>
                            <CCol md={6}>
                              <CFormLabel htmlFor="inputvehicletype">
                                Customer <span class="asterisk-mark">*</span>
                              </CFormLabel>

                              <CFormSelect
                                name="vehicle"
                                onChange={(data) => {
                                  console.log(data.target.value);
                                  setInputData({
                                    ...inputData,
                                    customer: data.target.value,
                                  });
                                  const customerById = customer.find(item=>item._id === data.target.value);
                                  if(customerById && customerById?.hotel_location){
                                    console.log("🚀 ~ SuperRequestTrip ~ customerById:", customerById,customerById?.hotel_location?.address)
                                    setTripFrom(customerById?.hotel_location?.address)
                                    setInputData({...inputData,trip_from:customerById?.hotel_location})
                                    setRefreshPrice(!refreshPrice)
                                  }
                                  if (data.target.value < 1) {
                                    setErrors({
                                      ...errors,
                                      customer: "Please select vehicle",
                                    });
                                  } else {
                                    setErrors({ ...errors, customer: null });
                                  }
                                }}
                              >
                                <option default>Select Customer</option>
                                {customer?.map((e, i) => {
                                  return (
                                    <>
                                      <option value={e._id}>
                                        {e.company_name}
                                      </option>
                                    </>
                                  );
                                })}
                              </CFormSelect>
                              {errors.customer && (
                                <span
                                  style={{ color: "red" }}
                                  className="text-danger"
                                >
                                  {errors.customer}
                                </span>
                              )}
                            </CCol>

                            <CCol md={6}>
                              <CFormLabel htmlFor="inputpickupdate">
                                Pickup Date and Time{" "}
                                <span class="asterisk-mark">*</span>
                              </CFormLabel>
                              <br />
                              <DatePicker
                                selected={pickupDate}
                                className="form-control"
                                showTimeSelect
                                timeIntervals={5}
                                minTime={customSetHours(
                                  customSetMinutes(
                                    new Date(),
                                    currentTime.minute
                                  ),
                                  currentTime.hour
                                )}
                                maxTime={customSetHours(
                                  customSetMinutes(new Date(), 59),
                                  23
                                )}
                                dateFormat="MM/dd/yyyy hh:mm a"
                                minDate={new Date()}
                                onChange={(data) => {
                                  console.log(data);
                                  setpickupDate(data);
                                  setInputData({
                                    ...inputData,
                                    pick_up_date: data,
                                  });
                                  if (data < 1) {
                                    setErrors({
                                      ...errors,
                                      pick_up_date:
                                        "Please add valid date for pickup date",
                                    });
                                  } else {
                                    setErrors({
                                      ...errors,
                                      pick_up_date: null,
                                    });
                                  }
                                }}
                              />
                              {errors.pick_up_date && (
                                <span
                                  style={{ color: "red" }}
                                  className="text-danger"
                                >
                                  {errors.pick_up_date}
                                </span>
                              )}
                            </CCol>

                            <CCol xs={6}>
                              <CFormLabel htmlFor="inputtripfrom">
                                Trip From <span class="asterisk-mark">*</span>
                              </CFormLabel>
                              {/* <CFormInput id="inputtripfrom" name="trip_from" onChange={inputHandler} /> */}
                              {/* <Autocomplete
                                apiKey={"AIzaSyD3i9Ft7G8S38xbkfRgvonQru-sbvNYd5M"}
                                onPlaceSelected={(place) => {
                                  updateTripFrom(place)
                                }}
                              /> */}

                              <PlacesAutocomplete
                                value={tripFrom}
                                onChange={(data) => {
                                  console.log(data);
                                  setTripFrom(data);
                                 
                                  if (data < 1) {
                                    setErrors({
                                      ...errors,
                                      trip_from:
                                        "Please add valid trip from address",
                                    });
                                  } else {
                                    setErrors({ ...errors, trip_from: null });
                                  }
                                }}
                                onSelect={handleSelectTripFrom}
                              >
                                {({
                                  getInputProps,
                                  suggestions,
                                  getSuggestionItemProps,
                                  loading,
                                }) => (
                                  <div>
                                    <CFormInput
                                      id="inputtripfrom"
                                      {...getInputProps({
                                        placeholder: "Enter a location",
                                      })}
                                    />
                                    <div className="suugestion-div">
                                      <div className="suggestion-inner">
                                        {loading && <div>Loading...</div>}
                                        {suggestions
                                          .slice(0, 3)
                                          .map((suggestion) => (
                                            <div
                                              key={suggestion.id}
                                              {...getSuggestionItemProps(
                                                suggestion
                                              )}
                                            >
                                              {suggestion.description}
                                            </div>
                                          ))}
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </PlacesAutocomplete>
                              {/* {tripFromCoordinates && (
                                  <div>
                                    <p>Latitude: {tripFromCoordinates.lat}</p>
                                    <p>Longitude: {tripFromCoordinates.lng}</p>
                                    <p>Address: {tripFrom}</p>
                                  </div>
                                )} */}
                              {errors.trip_from && (
                                <span
                                  style={{ color: "red" }}
                                  className="text-danger"
                                >
                                  {errors.trip_from}
                                </span>
                              )}
                            </CCol>
                            <CCol xs={6}>
                              <CFormLabel htmlFor="inputtripto">
                                Trip To <span class="asterisk-mark">*</span>
                              </CFormLabel>
                              {/* <CFormInput id="inputtripto" name="trip_to" onChange={inputHandler} /> */}
                              <PlacesAutocomplete
                                value={tripTo}
                                onChange={(data) => {
                                  console.log(data);
                                  setTrimTo(data);
                                  if (data < 1) {
                                    setErrors({
                                      ...errors,
                                      trip_to:
                                        "Please add valid trip to address",
                                    });
                                  } else {
                                    setErrors({ ...errors, trip_to: null });
                                  }
                                }}
                                onSelect={handleSelectTripTo}
                              >
                                {({
                                  getInputProps,
                                  suggestions,
                                  getSuggestionItemProps,
                                  loading,
                                }) => (
                                  <div>
                                    <CFormInput
                                      id="inputtripto"
                                      {...getInputProps({
                                        placeholder: "Enter a location",
                                      })}
                                    />
                                    <div className="suugestion-div">
                                      <div className="suggestion-inner">
                                        {loading && <div>Loading...</div>}
                                        {suggestions
                                          .slice(0, 3)
                                          .map((suggestion) => (
                                            <div
                                              key={suggestion.id}
                                              {...getSuggestionItemProps(
                                                suggestion
                                              )}
                                            >
                                              {suggestion.description}
                                            </div>
                                          ))}
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </PlacesAutocomplete>
                              {errors.trip_to && (
                                <span
                                  style={{ color: "red" }}
                                  className="text-danger"
                                >
                                  {errors.trip_to}
                                </span>
                              )}
                            </CCol>

                            <CCol xs={6}>
                              <CFormLabel htmlFor="inputfixedprice">
                                Fixed Price € (Optional)
                              </CFormLabel>
                              <CFormInput
                                id="inputfixedprice"
                                name="fixed_price"
                                type="number"
                                step="0.01"
                                value={price}
                                onChange={(e) => handlePriceChange(e)}
                              />
                            </CCol>
                            <CCol md={6}>
                              <CFormLabel htmlFor="inputvehicletype">
                                Pay Type <span class="asterisk-mark">*</span>
                              </CFormLabel>
                              <CFormSelect
                                name="pay"
                                onChange={(data) => {
                                  console.log(data.target.value);
                                  setInputData({
                                    ...inputData,
                                    pay_option: data.target.value,
                                  });
                                  if (data.target.value < 1) {
                                    setErrors({
                                      ...errors,
                                      pay_option:
                                        "Please select commission type",
                                    });
                                  } else {
                                    setErrors({ ...errors, pay_option: null });
                                  }
                                }}
                              >
                                <option value={"Cash"} selected>
                                  Cash
                                </option>
                                {/* <option value="Fixed">Cash</option> */}
                                {/* <option value='Hotel Account'>Hotel Account</option> */}
                              </CFormSelect>
                            </CCol>
                            <CCol xs={6}>
                              <CFormLabel htmlFor="inputtripfrom">
                                Comment
                              </CFormLabel>
                              <CFormInput
                                id="inputtripfrom"
                                onChange={(e) => {
                                  if (e.target.value.length > 20) {
                                    setErrors({
                                      ...errors,
                                      comment: "Max 20 characters allowed",
                                    });
                                    return;
                                  } else {
                                    setErrors({ ...errors, comment: null });
                                  }
                                  setInputData({
                                    ...inputData,
                                    comment: e.target.value,
                                  });
                                }}
                              />
                              {errors.comment && (
                                <span
                                  style={{ color: "red" }}
                                  className="text-danger"
                                >
                                  {errors.comment}
                                </span>
                              )}
                            </CCol>
                            <CCol md={6}>
                              <CFormLabel htmlFor="inputvehicletype">
                                Commission Type{" "}
                                <span class="asterisk-mark">*</span>
                              </CFormLabel>
                              <CFormSelect
                                name="commission_type"
                                onChange={(data) => {
                                  setInputData((prev) => {
                                    const newValue = prev;
                                    newValue.commission_type =
                                      data.target.value;
                                    newValue.commission_value = "";
                                    return newValue;
                                  });
                                  if (data.target.value < 1) {
                                    setErrors({
                                      ...errors,
                                      commission_type:
                                        "Please select commission type",
                                    });
                                  } else {
                                    setErrors({
                                      ...errors,
                                      commission_type: null,
                                    });
                                  }
                                }}
                              >
                                <option value={"Fixed"} selected>
                                  Fixed
                                </option>
                                {/* <option value="Fixed">Cash</option> */}
                                <option value="Percentage">Percentage</option>
                              </CFormSelect>
                            </CCol>
                            <CCol xs={6}>
                              <CFormLabel htmlFor="inputtripfrom">
                                Commission Value{" "}
                                <span class="asterisk-mark">*</span>
                              </CFormLabel>
                              <CFormInput
                                id="inputtripfrom"
                                type="number"
                                value={inputData.commission_value}
                                onChange={(e) => {
                                  if (
                                    inputData.commission_type == "Percentage"
                                  ) {
                                    if (e.target.value > 100) {
                                      setErrors({
                                        ...errors,
                                        commission_value:
                                          "Value should be smaller than 100",
                                      });
                                      setInputData({
                                        ...inputData,
                                        commission_value: e.target.value,
                                      });
                                      return;
                                    }
                                  }
                                  setInputData({
                                    ...inputData,
                                    commission_value: e.target.value,
                                  });
                                  setErrors({
                                    ...errors,
                                    commission_value: null,
                                  });
                                }}
                              />
                              {errors.commission_value && (
                                <span
                                  style={{ color: "red" }}
                                  className="text-danger"
                                >
                                  {errors.commission_value}
                                </span>
                              )}
                            </CCol>
                            <CCol xs={6}>
                              <CFormLabel htmlFor="inputtripfrom">
                                Passenger Count
                              </CFormLabel>
                              <CFormInput
                                id="inputtripfrom"
                                type="number"
                                onChange={(e) => {
                                  if (e.target.value.length > 20) {
                                    setErrors({
                                      ...errors,
                                      passengerCount: "Max 20 characters allowed",
                                    });
                                    return;
                                  } else {
                                    setErrors({ ...errors, passengerCount: null });
                                  }
                                  setInputData({
                                    ...inputData,
                                    passengerCount: e.target.value,
                                  });
                                }}
                              />
                              {errors.passengerCount && (
                                <span
                                  style={{ color: "red" }}
                                  className="text-danger"
                                >
                                  {errors.passengerCount}
                                </span>
                              )}
                            </CCol>
                            <CCol xs={6}>
                              <CFormLabel htmlFor="inputtripfrom">
                                Passenger Name
                              </CFormLabel>
                              <CFormInput
                                id="inputtripfrom"
                                onChange={(e) => {
                                  if (e.target.value.length > 20) {
                                    setErrors({
                                      ...errors,
                                      name: "Max 20 characters allowed",
                                    });
                                    return;
                                  } else {
                                    setErrors({ ...errors, name: null });
                                  }
                                  setInputData({
                                    ...inputData,
                                    name: e.target.value,
                                  });
                                }}
                              />
                              {errors.name && (
                                <span
                                  style={{ color: "red" }}
                                  className="text-danger"
                                >
                                  {errors.name}
                                </span>
                              )}
                            </CCol>
                            <CCol xs={6}>
                              <CFormLabel htmlFor="inputtripfrom">
                                Passenger Address
                              </CFormLabel>
                              <CFormInput
                                id="inputtripfrom"
                                onChange={(e) => {
                                  if (e.target.value.length > 50) {
                                    setErrors({
                                      ...errors,
                                      address: "Max 50 characters allowed",
                                    });
                                    return;
                                  } else {
                                    setErrors({ ...errors, address: null });
                                  }
                                  setInputData({
                                    ...inputData,
                                    address: e.target.value,
                                  });
                                }}
                              />
                              {errors.address && (
                                <span
                                  style={{ color: "red" }}
                                  className="text-danger"
                                >
                                  {errors.address}
                                </span>
                              )}
                            </CCol>
                            <CCol xs={6}>
                              <CFormLabel htmlFor="inputtripfrom">
                                Passenger Email
                              </CFormLabel>
                              <CFormInput
                                id="inputtripfrom"
                                type="email"
                                onChange={(e) => {
                                  if (e.target.value.length > 20) {
                                    setErrors({
                                      ...errors,
                                      email: "Max 20 characters allowed",
                                    });
                                    return;
                                  } else {
                                    setErrors({ ...errors, email: null });
                                  }
                                  setInputData({
                                    ...inputData,
                                    email: e.target.value,
                                  });
                                }}
                              />
                              {errors.email && (
                                <span
                                  style={{ color: "red" }}
                                  className="text-danger"
                                >
                                  {errors.email}
                                </span>
                              )}
                            </CCol>
                            <CCol xs={6}>
                              <CFormLabel htmlFor="inputtripfrom">
                                Passenger Phone
                              </CFormLabel>
                              <CFormInput
                                id="inputtripfrom"
                                type="number"
                                onChange={(e) => {
                                  if (e.target.value.length > 16) {
                                    setErrors({
                                      ...errors,
                                      phone: "Max 16 characters allowed",
                                    });
                                    return;
                                  } else {
                                    setErrors({ ...errors, phone: null });
                                  }
                                  setInputData({
                                    ...inputData,
                                    phone: e.target.value,
                                  });
                                }}
                              />
                              {errors.phone && (
                                <span
                                  style={{ color: "red" }}
                                  className="text-danger"
                                >
                                  {errors.phone}
                                </span>
                              )}
                            </CCol>
                          </CForm>
                        </CCardBody>
                      </CCard>
                    </CCol>
                  </CRow>

                  <CRow className="passenger-details">
                    {passengers.map((passenger, index) => (
                      <CCol xs={12} key={index}>
                        <CCard className="mb-4">
                          <CCardHeader>
                            <strong>Passenger Details</strong>
                            {index >= 0 && (
                              <CButton
                                type="button"
                                onClick={() => removePassenger(index)}
                                className="remove_passenger_btn"
                              >
                                - Remove Passenger
                              </CButton>
                            )}
                          </CCardHeader>
                          <CCardBody>
                            <CForm className="row g-3">
                              <CCol md={6}>
                                <CFormLabel htmlFor="inputname">
                                  Name<span class="asterisk-mark">*</span>
                                </CFormLabel>
                                <CFormInput
                                  aria-label="name"
                                  name="name"
                                  value={passenger.name || ""}
                                  onChange={(e) => {
                                    addOnChangeHandler(e, index);
                                  }}
                                  onBlur={() => {
                                    handleBlur(index, "name");
                                  }}
                                />
                                {passengerError[index].name && (
                                  <div style={{ color: "red" }}>
                                    {passenger.nameCheck}
                                    <br />
                                    {passenger.nameLengthCheck}
                                  </div>
                                )}
                              </CCol>
                              <CCol xs={6}>
                                <CFormLabel htmlFor="inputphnno">
                                  Phone<span class="asterisk-mark">*</span>
                                </CFormLabel>
                                <CFormInput
                                  id="inputphnno"
                                  name="phone"
                                  type="number"
                                  value={passenger.phone || ""}
                                  onChange={(e) => {
                                    addOnChangeHandler(e, index);
                                  }}
                                  onBlur={() => {
                                    handleBlur(index, "phone");
                                  }}
                                />
                                {passengerError[index].phone && (
                                  <div style={{ color: "red" }}>
                                    {passenger.phoneCheck}
                                    <br />
                                    {passenger.phoneLengthCheck}
                                  </div>
                                )}
                              </CCol>
                              <CCol xs={6}>
                                <CFormLabel htmlFor="inputtemailadd">
                                  Email Address
                                  <span class="asterisk-mark">*</span>
                                </CFormLabel>
                                <CFormInput
                                  id="inputemailadd"
                                  name="email"
                                  value={passenger.email || ""}
                                  onChange={(e) => {
                                    addOnChangeHandler(e, index);
                                  }}
                                  onBlur={() => {
                                    handleBlur(index, "email");
                                  }}
                                />
                                {passengerError[index].email && (
                                  <div style={{ color: "red" }}>
                                    {passenger.emailCheck}
                                    <br />
                                    {passenger.emailFormat}
                                  </div>
                                )}
                              </CCol>
                              <CCol xs={6}>
                                <CFormLabel htmlFor="inputaddress">
                                  Address<span class="asterisk-mark">*</span>
                                </CFormLabel>
                                <CFormInput
                                  id="inputaddress"
                                  name="address"
                                  value={passenger.address || ""}
                                  onChange={(e) => {
                                    addOnChangeHandler(e, index);
                                  }}
                                  onBlur={() => {
                                    handleBlur(index, "address");
                                  }}
                                />
                                {passengerError[index].address && (
                                  <div style={{ color: "red" }}>
                                    {passenger.addressCheck}
                                    <br />
                                    {passenger.addressLengthCheck}
                                  </div>
                                )}
                              </CCol>
                            </CForm>
                          </CCardBody>
                        </CCard>
                      </CCol>
                    ))}
                    <CCol xs={12}>
                      <div
                        className="d-flex justify-content-end"
                        style={{ marginTop: "40px" }}
                      >
                        {/* <CButton
                          type="button"
                          onClick={addPassenger}
                          className="add_passenger_btn"
                        >
                          + Add Passenger
                        </CButton> */}
                      </div>
                    </CCol>
                  </CRow>
                  <CCol xs={12}>
                    <div
                      className="d-flex justify-content-center"
                      style={{ marginTop: "40px" }}
                    >
                      <CButton
                        type="submit"
                        className="submit-btn"
                        onClick={() => {
                          adddata();
                        }}
                      >
                        {formLoader ? <ClipLoader color="#000000" /> : "Submit"}
                      </CButton>
                      <CButton
                        type="button"
                        onClick={() => {
                          navigate("/taxi/trips/pendingtrips");
                        }}
                        className="cancel-btn"
                      >
                        Cancel
                      </CButton>
                    </div>
                  </CCol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuperRequestTrip;
