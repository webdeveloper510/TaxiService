import React, { useState, useEffect } from "react";
import AppHeader from "../../TopBar/AppHeader";
import SideBar2 from "../SideBar2"
import * as geolib from "geolib";

// import SuperSideBar from "../../Taxi/SiderNavBar/Sidebar";
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
} from '@coreui/react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { getDriver, getFare, getVehicle, getVehicleType } from "../../../utils/api";
import { addTrip } from "../../../utils/api";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import userContext from "../../../utils/context";
import { isValidDate } from "../../../utils/helpingFunction";


const RequestNewTrip = () => {
  const [refreshPrice, setRefreshPrice] = useState(false);
  const { user, setUser } = useContext(userContext);
  function customSetHours(date, hour) {
    if (date instanceof Date) {
      const newDate = new Date(date);
      newDate.setHours(hour);
      return newDate;
    } else {
      throw new Error('Invalid Date object');
    }
  }
  const [selectedFrom, setSelectedFrom] = useState(true);
  const [selectedTo, setSelectedTo] = useState(false);

  // Function to set the minute component of a Date object
  function customSetMinutes(date, minute) {
    if (date instanceof Date) {
      const newDate = new Date(date);
      newDate.setMinutes(minute);
      return newDate;
    } else {
      throw new Error('Invalid Date object');
    }
  }
  const [fares, setFares] = useState(null);
  const [selectedFare, setSelectedFare] = useState(null);
  const navigate = useNavigate();
  const [price, setPrice] = useState(0)
  const [pickupDate, setpickupDate] = useState(new Date());

  useEffect(() => {
    const today = new Date();
    if (pickupDate?.toDateString() == today?.toDateString()) {
      SetCurrentTime({
        hour: today.getHours(),
        minute: today.getMinutes() + 1,
      })
    } else {
      SetCurrentTime({
        hour: 0,
        minute: 0
      })
    }
  }, [pickupDate])
  const [currentTime, SetCurrentTime] = useState({
      hour: (new Date()).getHours(),
      minute: (new Date()).getMinutes() + 1,
  })
  const [passengers, setPassengers] = useState([

  ]);
  const [vehicle, setVehicle] = useState();
  const [inputData, setInputData] = useState({
    vehicle: "",
    trip_from: {
      address: user?.company_detail?.hotel_location?.address,
      lat: user?.company_detail?.hotel_location?.lat,
      log: user?.company_detail?.hotel_location?.log,
    },
    trip_to: { address: "", lat: null, log: null },
    pick_up_date: new Date(),
    passenger_detail: [],
    comment: "",
    pay_option: "",

  });
  const priceCalculator = () => {

    let distance = null;
    if (inputData?.trip_from?.log && inputData?.trip_to?.log) {
      distance = (geolib.getDistance(
        {
          latitude: inputData?.trip_from?.lat,
          longitude: inputData?.trip_from?.log
        },
        {
          latitude: inputData?.trip_to?.lat,
          longitude: inputData?.trip_to?.log,
        }
      ) / 1000
      ).toFixed(2);
    }
    console.log("distance is from priceCalculator", distance);
    if (distance && selectedFare) {
      setPrice((distance * selectedFare?.vehicle_fare_per_km).toFixed(2))
    } else {
      setPrice(0)
    }
  }

  useEffect(priceCalculator, [refreshPrice])
  const [passengerError, setPassengerError] = useState([])
  const [formValid, setFormValid] = useState(true);
  useEffect(() => {
    console.log(formValid, "formvalidation check")
  }, [formValid])
  const formValidation = () => {
    const data = [...passengers];
    console.log("🚀 ~ file: requesttrip.jsx:139 ~ formValidation ~ data:", data)
    var re = /\S+@\S+\.\S+/;
    const phoneRegex = /^[0-9]*$/
    let valid = true;
    for (let index = 0; index < data?.length; index++) {
      // const element = data[index];
      if (data[index].name == "") {
        data[index].nameCheck = "Name required";
        data[index].nameLengthCheck = "";
        valid = false;
      } else if (data[index].name?.length < 3) {
        data[index].nameLengthCheck = "Please enter valid name";
        data[index].nameCheck = "";
        valid = false;
      } else if (data[index].name?.length > 20) {
        data[index].nameLengthCheck = "Name must be at most 20 characters";
        data[index].nameCheck = "";
        valid = false;
      } else {
        data[index].nameCheck = "";
        data[index].nameLengthCheck = "";

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
        data[index].phone?.length < 7 &&
        data[index].phone?.length > 16
      ) {
        data[index].phoneLengthCheck = "Please enter valid phone number";
        data[index].phoneCheck = "";
        valid = false;
      } else {
        data[index].phoneCheck = "";
        data[index].phoneLengthCheck = "";

      }
      if (data[index].address == "") {
        data[index].addressCheck = "Address required";
        data[index].addressLengthCheck = "";
        valid = false;
      } else if (
        data[index].address?.length < 7 &&
        data[index].address?.length > 16
      ) {
        data[index].addressLengthCheck = "Please enter valid address";
        data[index].addressCheck = "";
        valid = false;
      } else {
        data[index].addressCheck = "";
        data[index].addressLengthCheck = "";

      }
    }
    setFormValid(valid);

    setPassengers(data);
    return valid;
  };

  const [errors, setErrors] = useState({
    vehicle: null,
    trip_from: null,
    trip_to: null,
    pick_up_date: null,
    passenger_detail: [],
    description: null,
    pay_option: null,
    comment: null
  });

  const handlepickupDateChange = (date) => {
    setpickupDate(date);

    setInputData({
      ...inputData,
      pick_up_date: date,
    });
  };

  const addPassenger = () => {
    setPassengers([
      ...passengers,
      { name: "", email: "", phone: "", address: "" },
    ]);
    setPassengerError([...passengerError, {
      name: false,
      phone: false,
      email: false,
      address: false,
    }])
    setFormValid(false)
  };
  const handleBlur = (index, key) => {
    const newPassengersError = [...passengerError]
    newPassengersError[index][key] = true;
    setPassengerError(newPassengersError);
    console.log(passengerError)
  };
  const removePassenger = (index) => {
    console.log(index, "index")
    console.log("passengersBefore update", passengers)
    const updatedPassengers = passengers.filter((_, i) => i !== index);
    console.log("🚀 ~ file: requesttrip.jsx:262 ~ removePassenger ~ updatedPassengers:", updatedPassengers)
    setPassengers(updatedPassengers);
    const errorArray = passengerError.filter((_, i) => i !== index);
    setPassengerError(errorArray)
    setFormValid(false)
  };

  useEffect(() => {
    getVehicleType().then((res) => {
      console.log(res.result, "vehicleType");
      if (res?.code === 200) {
        setVehicle(res.result);
      }
    });
    getFare().then((res) => {
      console.log(res?.result, "fares");
      if (res?.code === 200) {
        setFares(res?.result);
      }
    });

  }, []);

  // useEffect(() => {
  //   getDriver().then(res => {
  //     console.log(res.result, 'vehicle')
  //     if (res?.code === 200) {
  //       setDriver(res.result)
  //     }
  //   })

  const inputHandler = (e) => {
    if (e.target.value?.length < 1) {
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
    obj[e.target.name] = e.target.value.trimStart();
    arr[index] = obj;
    setPassengers([...arr]);
    formValidation();
    // const errorRes = formValidation(passengers);
    // if(errorRes){
    //   console.log("success")
    // }else{
    //   console.log("error")
    // }
  };

  const adddata = () => {
    let data = inputData;
    let valid = true;
    const passError = passengerError.map(() => {
      return {
        name: true,
        phone: true,
        email: true,
        address: true,
      }
    });
    setPassengerError(passError);
    let newErrors = { ...errors };

    const errorRes = formValidation();
    console.log("data beafore vehicle", vehicle);
    if (
      !data.trip_from.lat ||
      !data.trip_from.log ||
      data.trip_from.address?.length < 1 ||
      !selectedFrom
    ) {
      console.log("enter valid trip from");
      valid = false;
      newErrors.trip_from = "Please select valid trip from address";
    }
    if (
      !data.trip_to.lat ||
      !data.trip_to.log ||
      data.trip_to.address?.length < 1 ||
      !selectedTo
    ) {
      valid = false;
      newErrors.trip_to = "Please select valid trip to address";
    }
    if (data.vehicle?.length < 1) {
      valid = false;
      newErrors.vehicle = "Please select valid vehicle";
    }
    if (inputData.pick_up_date?.length < 1 || !isValidDate(inputData.pick_up_date)) {
      valid = false;
      newErrors.pick_up_date = "Please select valid pick-up date";
    }
    if (inputData.pay_option?.length < 1) {
      valid = false;
      newErrors.pay_option = "Please select valid Pay Option";
    }
    if (inputData.comment?.length > 50) {
      valid = false;
      newErrors.comment = "Comment must be at Most 50 characters";
    }

    if (!valid) {
      setErrors(newErrors);
      toast.warning("Please Enter Valid Detail", {
        position: "top-right",
        autoClose: 1000,
      });
      return console.log(errors);
    }
    data.passenger_detail = passengers;
    console.log("data beafore api", data);
    if (errorRes) {
      data.vehicle_type = data.vehicle
      delete data.vehicle
      data.pickup_date_time = data.pick_up_date;
      delete data.pick_up_date;
      addTrip(data).then((res) => {
        console.log("response---->>>>", res);
        if (res.data.code === 200) {
          toast.success(`${res.data.message}`, {
            position: "top-right",
            autoClose: 1000,
          });
          navigate("/trips/pendingtrips");
        } else {
          toast.warning(`${res.data.message}`, {
            position: "top-right",
            autoClose: 1000,
          });
        }
      });
    } else {
      toast.warning("Please Enter Valid Detail", {
        position: "top-right",
        autoClose: 1000,
      });
    }
  };
  const [tripFrom, setTripFrom] = useState(user?.company_detail?.hotel_location?.address);
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
      // priceCalculator()
      setRefreshPrice(!refreshPrice)
      setSelectedFrom(true);
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
      // priceCalculator()
      setRefreshPrice(!refreshPrice)
      setSelectedTo(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const copy = () => {
    const textToCopy = `https://taxi-service-demo.vercel.app/booking-staff-form/${user._id}`
    const textarea = document.createElement('textarea');
    textarea.value = textToCopy;
    document.body.appendChild(textarea);

    // Select the text inside the textarea
    textarea.select();

    // Execute the copy command
    document.execCommand('copy');

    // Remove the textarea from the document
    document.body.removeChild(textarea);
    toast.success(`Booking link copy to clipboard`, {
      position: "top-right",
      autoClose: 1000,
    });
  }
  const setFareOnVehicleType = (vehicle_type) => {
    fares.forEach((fare) => {
      if (fare.vehicle_type == vehicle_type) {
        setSelectedFare(fare);
        console.log("selectecd fare is", fare)
      }
    })
  }
  return (
    <>
      <div className="container-fluidd">
        <div className="col-md-12">
          <div>
            <SideBar2 />

            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
              <AppHeader />
              <div
                className="body flex-grow-1 px-3"
                style={{ paddingBottom: "20px" }}
              >
                <h1 class="heading-for-every-page">Request Trip</h1>
                <div className="bookiing_btn">
                  <CButton id="hotel_booking_link"

                    onClick={copy}
                  >
                    Copy Hotel Booking Link
                  </CButton>
                </div>
                <div class="active-trip-outer">
                  <CRow>
                    <CCol xs={12}>
                      <CCard className="mb-4">
                        {/* <CCardHeader>
                          <strong>Add Trip Details</strong>
                        </CCardHeader> */}
                        <CCardBody>
                          <CForm className="row g-3">
                            {/* <CCol md={6}>
                              <CFormLabel htmlFor="inputtripdname">Driver Name</CFormLabel>
                              <CFormSelect name="driver_name" onChange={inputHandler}>
                                <option default>Select Driver</option>
                                {driver?.map((e, i) => {
                                  return (
                                    <>
                                      <option value={e._id}>{e.first_name}</option>
                                    </>
                                  )
                                })}


                              </CFormSelect>
                            </CCol> */}
                            <CCol md={6}>
                              <CFormLabel htmlFor="inputvehicletype">
                                Vehicle Type<span class="asterisk-mark">*</span>
                              </CFormLabel>
                              <CFormSelect
                                name="vehicle"
                                onChange={(data) => {

                                  console.log(data.target.value);
                                  setFareOnVehicleType(data.target.value);
                                  setInputData({
                                    ...inputData,
                                    vehicle: data.target.value,
                                  });
                                  if (data.target.value < 1) {
                                    setErrors({
                                      ...errors,
                                      vehicle: "Please select vehicle",
                                    });
                                  } else {
                                    setErrors({ ...errors, vehicle: null });
                                  }
                                  // priceCalculator()
                                  setRefreshPrice(!refreshPrice)
                                }}
                              >
                                <option default>Select Vehicle</option>
                                {vehicle?.map((e, i) => {
                                  return (
                                    <>
                                      <option value={e.name}>{e.name}</option>
                                    </>
                                  );
                                })}
                              </CFormSelect>
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
                              <CFormLabel htmlFor="inputpickupdate">
                                Pickup Date and Time<span class="asterisk-mark">*</span>
                              </CFormLabel>
                              <br />
                              <DatePicker
                                selected={pickupDate}
                                className="form-control"
                                showTimeSelect
                                timeIntervals={5}
                                minTime={customSetHours(customSetMinutes(new Date(), currentTime.minute), currentTime.hour)}
                                maxTime={customSetHours(customSetMinutes(new Date(), 59), 23)}
                                dateFormat="MM/dd/yyyy hh:mm a"
                                minDate={new Date()}
                                onChange={(data) => {
                                  console.log(data);
                                  setpickupDate(data)
                                  setInputData({
                                    ...inputData,
                                    pick_up_date: data,
                                  });
                                  if (data < 1 || !isValidDate(data)) {
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
                                Trip From<span class="asterisk-mark">*</span>
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
                                  setSelectedFrom(false);
                                  // if (data < 1 || !selectedFrom) {
                                  setErrors({
                                    ...errors,
                                    trip_from:
                                      "Please select valid trip from address",
                                  });
                                  // } else {
                                  //   setErrors({ ...errors, trip_from: null });
                                  // }
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
                                Trip To<span class="asterisk-mark">*</span>
                              </CFormLabel>
                              {/* <CFormInput id="inputtripto" name="trip_to" onChange={inputHandler} /> */}
                              <PlacesAutocomplete
                                value={tripTo}
                                onChange={(data) => {
                                  console.log(data);
                                  setTrimTo(data);
                                  setSelectedTo(false);
                                  // if (data < 1 || !setSelectedTo) {
                                  setErrors({
                                    ...errors,
                                    trip_to:
                                      "Please select valid trip to address",
                                  });
                                  // } else {
                                  //   setErrors({ ...errors, trip_to: null });
                                  // }
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
                            <CCol md={6}>
                              <CFormLabel htmlFor="inputvehicletype">
                                Pay Type<span class="asterisk-mark">*</span>
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
                                      pay_option: "Please select commission type",
                                    });
                                  } else {
                                    setErrors({ ...errors, pay_option: null });
                                  }
                                }}
                              >
                                <option value="" disabled selected>Select a Pay Option</option>
                                <option value={"Cash"} >Cash</option>
                                {/* <option value="Fixed">Cash</option> */}
                                <option value='Hotel Account'>Hotel Account</option>


                              </CFormSelect>
                              {errors.pay_option && (
                                <span
                                  style={{ color: "red" }}
                                  className="text-danger"
                                >
                                  {errors.pay_option}
                                </span>
                              )}
                            </CCol>
                            <CCol xs={6}>
                              <CFormLabel htmlFor="inputtripfrom">
                                Comment
                              </CFormLabel>
                              <CFormInput
                                id="inputtripfrom"
                                onChange={(e) => {
                                  setInputData({
                                    ...inputData,
                                    comment: e.target.value,
                                  });
                                  if (e.target.value.length > 50) {
                                    setErrors({ ...errors, comment: "Comments must be at most 50 characters" })
                                  } else {
                                    setErrors({ ...errors, comment: null })
                                  }
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
                            <CCol xs={6}>
                              <CFormLabel htmlFor="inputtripfrom">
                                Price: {price} (€)
                              </CFormLabel>


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
                                <CFormLabel htmlFor="inputname"

                                >
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
                                    handleBlur(index, "name")
                                  }}
                                />
                                {passengerError[index].name && <div style={{ color: "red" }}>
                                  {passenger.nameCheck}
                                  <br />
                                  {passenger.nameLengthCheck}
                                </div>}
                              </CCol>
                              <CCol xs={6}>
                                <CFormLabel htmlFor="inputphnno"

                                >
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
                                    handleBlur(index, "phone")
                                  }}
                                />
                                {passengerError[index].phone && <div style={{ color: "red" }}>
                                  {passenger.phoneCheck}
                                  <br />
                                  {passenger.phoneLengthCheck}
                                </div>}
                              </CCol>
                              <CCol xs={6}>
                                <CFormLabel htmlFor="inputtemailadd"

                                >
                                  Email Address<span class="asterisk-mark">*</span>
                                </CFormLabel>
                                <CFormInput
                                  id="inputemailadd"
                                  name="email"
                                  value={passenger.email || ""}
                                  onChange={(e) => {
                                    addOnChangeHandler(e, index);

                                  }}
                                  onBlur={() => {
                                    handleBlur(index, "email")
                                  }}
                                />
                                {passengerError[index].email && <div style={{ color: "red" }}>
                                  {passenger.emailCheck}
                                  <br />
                                  {passenger.emailFormat}
                                </div>}
                              </CCol>
                              <CCol xs={6}>
                                <CFormLabel htmlFor="inputaddress"

                                >
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
                                    handleBlur(index, "address")
                                  }}
                                />
                                {passengerError[index].address && <div style={{ color: "red" }}>
                                  {passenger.addressCheck}
                                  <br />
                                  {passenger.addressLengthCheck}
                                </div>}
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
                        <CButton
                          type="button"
                          onClick={addPassenger}
                          className="add_passenger_btn"
                        >
                          + Add Passenger
                        </CButton>
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
                        onClick={adddata}
                      >
                        Submit
                      </CButton>
                      <CButton type="button"
                        onClick={() => {
                          navigate("/taxi/trips/pendingtrips");
                        }}
                        className="cancel-btn">
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

export default RequestNewTrip;