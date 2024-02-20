import React, { useState, useEffect } from "react";
import AppHeader from "../../TopBar/AppHeader";
import SideBar2 from "../SideBar2";
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
} from "@coreui/react";
import * as geolib from "geolib";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import backtovehicle from "../../../assets/images/left-arrow.png";
import { getFare, getTripById, getVehicleType, tripsUpdate } from "../../../utils/api";
import AppLoader from "../../AppLoader";
import { toast } from "react-toastify";
import { SuperBar } from "../../SuperAdmin/Sidebar/AppSideNavBar";
import SuperSideBar from "../../Taxi/SiderNavBar/Sidebar";

const EditpendingTrip = ({ role }) => {
  const [fares, setFares] = useState(null);

  const [selectedFare, setSelectedFare] = useState(null);
  const [refreshPrice, setRefreshPrice] = useState(false);
  const [selectedFrom, setSelectedFrom] = useState(true);
  const [selectedTo, setSelectedTo] = useState(true);
  const pendingId = useParams();
  console.log("pending id", pendingId.id);
  const navigate = useNavigate();
  const [price, setPrice] = useState("")

  const [pickupDate, setpickupDate] = useState(new Date());
  const [passengers, setPassengers] = useState([]);
  const [vehicle, setVehicle] = useState();
  const [currentTime, SetCurrentTime] = useState({
    hour: {
      hour: new Date().getHours(),
      minute: new Date().getMinutes() + 1,
    },
    minute: 0,
  });
  const [passengerError, setPassengerError] = useState([{
    name: false,
    phone: false,
    email: false,
    address: false,
  }])
  const [inputData, setInputData] = useState({
    id: "",
    vehicle: "",
    trip_from: { address: "", lat: null, log: null },
    trip_to: { address: "", lat: null, log: null },
    pick_up_date: new Date(),
    passenger_detail: [],
    commission_type: "Fixed",
    commission_value: "",
    comment: "",
    pay_option: "Cash",
  });
  const [errors, setErrors] = useState({
    vehicle: null,
    trip_from: null,
    trip_to: null,
    pick_up_date: null,
    passenger_detail: [],
    commission_type: null,
    commission_value: null,
    comment: null,
    pay_option: null,
  });
  const [inputs, setInputs] = useState([
    { name: "", email: "", phone: "", address: "" },
  ]);
  const [tripFrom, setTripFrom] = useState("");
  const [tripFromCoordinates, setTripFromCoordinates] = useState(null);
  const [tripTo, setTrimTo] = useState("");
  const [tripToCoordinates, setTripToCoordinates] = useState(null);
  const [loading, setLoading] = useState(false);
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
    console.log("🚀 ~ priceCalculator ~ selectedFare:", selectedFare)
    if (distance) {
      setPrice((distance * selectedFare?.vehicle_fare_per_km).toFixed(2))
    } else {
      setPrice("0")
    }
  }
  useEffect(priceCalculator, [refreshPrice])
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
      setSelectedFrom(true);
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
      setSelectedTo(true)
      setRefreshPrice(!refreshPrice)
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handlepickupDateChange = (date) => {
    setpickupDate(date);
  };

  const addPassenger = () => {
    setInputs([
      ...inputs,
      { name: "", email: "", phone: "", address: "" },
    ]);
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
  function customSetMinutes(date, minute) {
    if (date instanceof Date) {
      const newDate = new Date(date);
      newDate.setMinutes(minute);
      return newDate;
    } else {
      throw new Error("Invalid Date object");
    }
  }

  const removePassenger = (index) => {
    const updatedPassengers = inputs.filter((_, i) => i !== index);
    setInputs(updatedPassengers);
  };
  useEffect(() => {
    getVehicleType().then((res) => {
      console.log(res.result, "vehicleType");
      if (res?.code === 200) {
        const vehicleFromApi = res.result;
        // setVehicle(res.result);
        getFare().then((res) => {
          console.log(res?.result, "fares");
          if (res?.code === 200) {
            const fareFromApi = res?.result;
            setFares(fareFromApi);

            const newVehicle = [];
            vehicleFromApi.forEach((item)=>{
              console.log("res2.result",fareFromApi)
              fareFromApi.forEach(fare => {
                if(fare.vehicle_type == item.name){
                  newVehicle.push(item);
                }
              })
            })
            setVehicle(newVehicle);
          }
        });
      }
    });
  }, []);
  const formValidation = (inputs) => {
    const data = [...inputs];
    var re = /\S+@\S+\.\S+/;
    const phoneRegex = /^[0-9]{10}$/;
    let valid = true;
    for (let index = 0; index < data?.length; index++) {
      // const element = data[index];
      if (data[index].name == "") {
        data[index].nameCheck = "Name required";
        data[index].nameLengthCheck = "";
        valid = false;
      } else if (/^\d+$/.test(data[index].name)) {
        data[index].nameCheck = "Name should not be a number";
        data[index].nameLengthCheck = "";
        valid = false;
    } else if (data[index].name?.length < 3) {
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
      }
      // else if (!phoneRegex.test(data[index].phone)) {
      // data[index].phoneCheck = "Enter only digit";
      // data[index].phoneLengthCheck = "";
      // valid = false;
      // } 
      else if (
        data[index].phone?.length < 7 ||
        data[index].phone?.length > 16
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
        data[index].address?.length < 7 ||
        data[index].address?.length > 50
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

    setInputs(data);
    return valid;
  };

  const geteditid = () => {
    setLoading(true)
    getTripById(pendingId.id)
      .then((res) => {
        console.log("pending trips id", res);
        if (res?.code == 200) {
          const value = res.result;
          setPrice(value?.price || "0")
          setTripFrom(value.trip_from.address)
          setTrimTo(value.trip_to.address)
          setInputData({
            id: value._id,
            vehicle: value.vehicle_type,
            trip_from: {
              address: value.trip_from.address,
              lat: value.trip_from.lat,
              log: value.trip_from.log,
            },
            trip_to: {
              address: value.trip_to.address,
              lat: value.trip_to.lat,
              log: value.trip_to.log,
            },
            pick_up_date: new Date(value.pickup_date_time),
            passenger_detail: [],
            commission_type: value?.commission?.commission_type,
            commission_value: value?.commission?.commission_value
          });
          handlepickupDateChange(new Date(value.pickup_date_time))
          setLoading(false)
          let passenger_detail = value.passenger_detail;
          let add_on = [];
          for (let value of passenger_detail)
            add_on.push({
              name: value.name,
              email: value.email,
              phone: value.phone,
              address: value.address,
            });
          setInputs(add_on);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false)
      }).finally(() => {
        setLoading(false)
      });
  };
  const handleBlur = (index, key) => {
    const newPassengersError = [...passengerError]
    newPassengersError[index][key] = true;
    setPassengerError(newPassengersError);
    console.log(passengerError)
  };
  const adddata = () => {
    let id = inputData.id
    let data = inputData;
    let valid = true;
    let newErrors = { ...errors };
    const errorRes = formValidation(inputs);
    console.log("data beafore vehicle", vehicle);
    if (
      !data.trip_from.lat ||
      !data.trip_from.log ||
      tripFrom.address?.length < 1 ||
      !selectedFrom
    ) {
      console.log("enter valid trip from");
      valid = false;
      newErrors.trip_from = "Please enter valid trip from address";
    }
    if (
      !data.trip_to.lat ||
      !data.trip_to.log ||
      data.trip_to.address?.length < 1 ||
      !selectedTo
    ) {
      valid = false;
      newErrors.trip_to = "Please enter valid trip to address";
    }
    if (data.vehicle?.length < 1) {
      valid = false;
      newErrors.vehicle = "Please select valid vehicle";
    }
    if (inputData.pick_up_date?.length < 1) {
      valid = false;
      newErrors.pick_up_date = "Please select valid pick-up date";
    }
    if (price <=0 ) {
      valid = false;
      toast.warning(`Price should be greater than 0`, {
        position: "top-right",
        autoClose: 1000,
      });
    }
    if (parseFloat(inputData.commission_value) <= 0 || inputData.commission_value.length == 0) {
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
      return console.log(errors);
    }
    data.passenger_detail = inputs;
    console.log("data beafore api", data);
    if (errorRes) {
      data.vehicle_type = data.vehicle;
      data.price = price
      delete data.vehicle;
      data.pickup_date_time = data.pick_up_date;
      delete data.pick_up_date;
      data.commission = {
        commission_type: data.commission_type,
        commission_value: data.commission_value,
      };
      tripsUpdate(id, data).then((res) => {
        console.log("response---->>>>", res);
        if (res.data.code === 200) {
          toast.success(`${res.data.message}`, {
            position: "top-right",
            autoClose: 1000,
          });
          back()

        } else {
          toast.warning(`${res.data.message}`, {
            position: "top-right",
            autoClose: 1000,
          });
        }
      });
    } else {
      toast.warning("Please Enter Passenger Detail", {
        position: "top-right",
        autoClose: 1000,
      });
    }
  };

  useEffect(() => {
    geteditid();
  }, []);

  console.log("passengerssssssssssss", inputData);
  const back = () => {
    navigate(`${role == "hotel" ? "" : "/taxi"}/trips/pendingtrips`);
  }
  const addOnChangeHandler = (e, index) => {
    let arr = inputs;
    console.log(inputs);
    let obj = arr[index];
    obj[e.target.name] = e.target.value;
    arr[index] = obj;
    setInputs([...arr]);
    formValidation(inputs)
  };
  const handlePriceChange = (event) => {
    const inputValueRegex = /^\d*\.?\d{0,2}$/; // Regular expression to allow up to 2 decimal places

    if (inputValueRegex.test(event.target.value) || event.target.value === '') {
      setPrice(event.target.value);
    }
  };
  const setFareOnVehicleType = (vehicle_type) => {
    // console.log("🚀 ~ setFareOnVehicleType ~ vehicle_type:", vehicle_type)

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
            {role == "hotel" ? < SideBar2 /> : <SuperSideBar />}

            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
              <AppHeader />
              <div
                className="body flex-grow-1 px-3"
                style={{ paddingBottom: "20px" }}
              >
                <h1 class="heading-for-every-page">
                  <Link to={`${role == "hotel" ? "" : "/taxi"}/trips/pendingtrips`}>
                    <img src={backtovehicle} alt="edit" /> Edit Pending Trip
                  </Link>
                </h1>
                {loading ? <AppLoader /> : <div class="active-trip-outer">
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
                                Vehicle Type <span class="asterisk-mark">*</span>
                              </CFormLabel>
                              <CFormSelect
                                name="vehicle"
                                value={inputData.vehicle}
                                onChange={(data) => {
                                  console.log(data.target.value);
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
                                {/* <option selected>{inputData.vehicle}</option> */}
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
                                Pickup Date and Time <span class="asterisk-mark">*</span>
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
                                  console.log("🚀 ~ EditpendingTrip ~ data:", data)
                                  
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
                            </CCol>

                            <CCol xs={6}>
                              <CFormLabel htmlFor="inputtripfrom">
                                Trip From<span class="asterisk-mark">*</span>
                              </CFormLabel>
                              <PlacesAutocomplete
                                value={tripFrom}
                                onChange={(data) => {
                                  setSelectedFrom(false);
                                  console.log(data);
                                  setTripFrom(data);
                                  
                                    setErrors({
                                      ...errors,
                                      trip_from:
                                        "Please add valid trip from address",
                                    });
                                  
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
                              {!selectedFrom && (
                                <span
                                  style={{ color: "red" }}
                                  className="text-danger"
                                >
                                  {errors.trip_from}
                                </span>
                              )}
                              {/* <CFormSelect
 maxLength="50"
 className="form-control bg-transparent"
 name="vehicle_type"
 autoComplete="off"
 >
 <option default></option>
 </CFormSelect> */}
                            </CCol>
                            <CCol xs={6}>
                              <CFormLabel htmlFor="inputtripto">
                                Trip To <span class="asterisk-mark">*</span>
                              </CFormLabel>
                              <PlacesAutocomplete
                                value={tripTo}
                                onChange={(data) => {
                                  console.log(data);
                                  setSelectedTo(false);
                                  setTrimTo(data);
                                  
                                    setErrors({
                                      ...errors,
                                      trip_to:
                                        "Please add valid trip to address",
                                    });
                                  
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
                              {!selectedTo && (
                                <span
                                  style={{ color: "red" }}
                                  className="text-danger"
                                >
                                  {errors.trip_to}
                                </span>
                              )}
                              {/* <CFormSelect
 maxLength="50"
 className="form-control bg-transparent"
 name="vehicle_type"
 autoComplete="off"
 >
 <option default></option>
 </CFormSelect> */}
                              {/* <CFormInput id="inputtripto" name="trip_to" onChange={inputHandler} /> */}
                            </CCol>
                            <CCol xs={6}>
                              <CFormLabel htmlFor="inputfixedprice">
                                Price
                              </CFormLabel>
                              <CFormInput id="inputfixedprice" name="fixed_price"
                                type="number"
                                step="0.01"
                                value={price}
                                onChange={(e) => handlePriceChange(e)}
                              />


                            </CCol>
                            <CCol md={6}>
                              <CFormLabel htmlFor="inputvehicletype">
                                Commission Type <span class="asterisk-mark">*</span>
                              </CFormLabel>
                              <CFormSelect
                                name="commission_type"
                                onChange={(data) => {
                                  setInputData((prev) => {
                                    const newValue = prev;
                                    newValue.commission_type = data.target.value;
                                    newValue.commission_value = "";
                                    return newValue;
                                  });
                                  if (data.target.value < 1) {
                                    setErrors({
                                      ...errors,
                                      commission_type: "Please select commission type",
                                    });
                                  } else {
                                    setErrors({ ...errors, commission_type: null });
                                  }
                                }}
                              >
                                <option value={"Fixed"} selected>Fixed</option>
                                {/* <option value="Fixed">Cash</option> */}
                                <option value='Percentage'>Percentage</option>


                              </CFormSelect>

                            </CCol>
                            <CCol xs={6}>
                              <CFormLabel htmlFor="inputtripfrom">
                                Commission Value <span class="asterisk-mark">*</span>
                              </CFormLabel>
                              <CFormInput
                                id="inputtripfrom"
                                type="number"
                                value={inputData.commission_value}
                                onChange={(e) => {
                                  if (inputData.commission_type == "Percentage") {
                                    if (e.target.value > 100) {
                                      setErrors({
                                        ...errors, commission_value: "Value should be smaller than 100"
                                      })
                                      setInputData({
                                        ...inputData,
                                        commission_value: e.target.value,
                                      });
                                      return
                                    }
                                  }
                                  setInputData({
                                    ...inputData,
                                    commission_value: e.target.value,
                                  });
                                  setErrors({
                                    ...errors, commission_value: null
                                  })
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
                          </CForm>
                        </CCardBody>
                      </CCard>
                    </CCol>
                  </CRow>

                  <CRow className="passenger-details">
                    {inputs?.map((passenger, index) => {
                      const error = {
                        name: false,
                        email: false,
                        phone: false,
                        address: false,
                      };
                      return (
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
                      );
                    })}
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
                      <CButton type="submit" className="submit-btn" onClick={adddata}>
                        Submit
                      </CButton>
                      <CButton type="button" className="cancel-btn" onClick={back}>
                        Cancel
                      </CButton>
                    </div>
                  </CCol>
                </div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditpendingTrip;