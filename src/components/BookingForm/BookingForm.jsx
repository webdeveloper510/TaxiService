import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/footer";
import bookingCar from '../../assets/images/booking-car.png'
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
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { getTripById, getVehicleType, tripsUpdate } from "../../utils/api";
import { toast } from "react-toastify";
import sessionExp from '../../assets/images/session-expired.png'
import backtotaxi from "../../assets/images/taxi.png"
//import background from '../assets/images/heroimg.png';
const BookingForm = () => {
  const booking = useParams();
  console.log("pending id", booking.id);
  const navigate = useNavigate();

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
  const [inputData, setInputData] = useState({
    id: "",
    vehicle: "Select a vehicle Type",
    trip_from: { address: "", lat: null, log: null },
    trip_to: { address: "", lat: null, log: null },
    pick_up_date: new Date(),
    passenger_detail: [],
  });
  const [errors, setErrors] = useState({
    vehicle: null,
    trip_from: null,
    trip_to: null,
    pick_up_date: null,
    passenger_detail: [],
  });
  const [inputs, setInputs] = useState([
    // { name: "", email: "", phone: "", address: "" },
  ]);
  const [tripFrom, setTripFrom] = useState("");
  const [tripFromCoordinates, setTripFromCoordinates] = useState(null);
  const [tripTo, setTrimTo] = useState("");
  const [tripToCoordinates, setTripToCoordinates] = useState(null);
  const [loading, setLoading] = useState(false);
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
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handlepickupDateChange = (date) => {
    setpickupDate(date);
  };

  const addPassenger = () => {
    setPassengers([
      ...passengers,
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
    const updatedPassengers = passengers.filter((_, i) => i !== index);
    setPassengers(updatedPassengers);
  };
  useEffect(() => {
    getVehicleType().then((res) => {
      console.log(res.result, "vehicleType");
      if (res?.code === 200) {
        setVehicle(res.result);
      }
    });
  }, []);
  const formValidation = (inputs) => {
    const data = [...inputs];
    var re = /\S+@\S+\.\S+/;
    const phoneRegex = /^[0-9]{10}$/;
    let valid = true;
    for (let index = 0; index < data?.length; index++) {
      const element = data[index];
      if (data[index].name == "") {
        data[index].nameCheck = "Name required";
        data[index].nameLengthCheck = "";
        valid = false;
      } else if (data[index].name?.length < 3) {
        data[index].nameLengthCheck = "Please enter valid name";
        data[index].nameCheck = "";
        valid = false;
      } else {
        data[index].nameCheck = "";
        data[index].nameLengthCheck = "";
        valid = true;
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
        valid = true;
      }
      if (data[index].phone == "") {
        data[index].phoneCheck = "Phone required";
        data[index].phoneLengthCheck = "";
        valid = false;
      }
      else if (!phoneRegex.test(data[index].phone)) {
        data[index].phoneCheck = "Enter only digit";
        data[index].phoneLengthCheck = "";
        valid = false;
      }
      else if (
        data[index].phone?.length < 7 &&
        data[index].phone?.length > 16
      ) {
        data[index].phoneLengthCheck = "Please enter valid phone number";
        data[index].phoneCheck = "";
        valid = false;
      } else {
        data[index].phoneCheck = "";
        data[index].phoneLengthCheck = "";
        valid = true;
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
        valid = true;
      }
    }

    setInputs(data);
    return valid;
  };
  const [expired, setExpired] = useState(false);
  const geteditid = () => {
    setLoading(true)
    getTripById(booking.id)
      .then((res) => {
        console.log("pending trips id", res);
        if (res?.code == 200) {
          if (res.result.status) {
            setExpired(true)
          }
          const value = res.result;
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

  const adddata = () => {
    let id = booking.id
    let data = inputData;
    let valid = true;
    let newErrors = { ...errors };
    const errorRes = formValidation(inputs);
    console.log("data beafore vehicle", vehicle);
    if (
      !data.trip_from.lat ||
      !data.trip_from.log ||
      data.trip_from.address?.length < 1
    ) {
      console.log("enter valid trip from");
      valid = false;
      newErrors.trip_from = "Please enter valid trip from address";
    }
    if (
      !data.trip_to.lat ||
      !data.trip_to.log ||
      data.trip_to.address?.length < 1
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
    if (!valid) {
      setErrors(newErrors);
      return console.log(errors);
    }
    data.passenger_detail = inputs;
    console.log("data beafore api", data);
    if (errorRes) {
      data.vehicle_type = data.vehicle;
      delete data.vehicle;
      data.pickup_date_time = data.pick_up_date;
      delete data.pick_up_date;
      tripsUpdate(id, data).then((res) => {
        console.log("response---->>>>", res);
        if (res.data.code === 200) {
          toast.success(`Your requested successfully submitted`, {
            position: "top-right",
            autoClose: 1000,
          });
          // navigate("/trips/pendingtrips");
        } else {
          toast.warning(`${res.data.message}`, {
            position: "top-right",
            autoClose: 1000,
          });
        }
      });
    } else {
      console.log("error", errorRes);
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

  const addOnChangeHandler = (e, index) => {
    let arr = inputs;
    console.log(inputs);
    let obj = arr[index];
    obj[e.target.name] = e.target.value;
    arr[index] = obj;
    setInputs([...arr]);
    formValidation(inputs)
  };
  return (
    <>
      {/* <Header /> */}
      <div className="main-page">
        <div class="container-outer" id="expired_outer">
        {expired ? <div>
          <div className="link_expired">
            <div className="img_outer">  <img src={sessionExp}/></div>
            <div className="link_text">
            <strong>Something bad happend</strong><br/>
   <p> The invitation link has expired. Please request a new link.</p>
            </div>
                  
                    </div>
                  </div> :  <section className="booking-section-form">
            <div className="booking-banner" id="bookimg-header">
              
          
              <div class="row booking-content col-md-12">
              <Link to="/dashboard">
              <span className="back_to_home"><img src={backtotaxi} />Back to Home </span>
              </Link>
                <div class="banner-inner-text col-md-6">
                  <h3>Welcome to Hotel Sky </h3>

                  <CRow>
                    <CCol xs={12}>
                      <CCard className="mb-4">
                        {/* <CCardHeader>
                          <strong>Add Trip Details</strong>
                        </CCardHeader> */}
                        <CCardBody>
                          <CForm className="row g-3">
                            <CCol md={6}>
                              <CFormLabel htmlFor="inputvehicletype">
                                Vehicle Type
                              </CFormLabel>
                              <CFormSelect
                                name="vehicle"
                                onChange={(data) => {
                                  console.log(data.target.value);
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
                                }}
                              >
                                <option default>{inputData.vehicle}</option>
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
                                Pickup Date and Time
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
                            </CCol>

                            <CCol xs={6}>
                              <CFormLabel htmlFor="inputtripfrom">
                                Trip From
                              </CFormLabel>
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
                              {errors.trip_from && (
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
                                Trip To
                              </CFormLabel>
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

                            <CCol xs={12}>
                              <div
                                className="d-flex justify-content-center"
                                style={{ marginTop: "40px" }}
                              >
                                <CButton
                                  type="button"
                                  className="confirm_boking_btn"
                                  onClick={adddata}
                                >
                                  Confirm Booking
                                </CButton>
                              </div>
                            </CCol>
                          </CForm>
                        </CCardBody>
                      </CCard>
                    </CCol>
                  </CRow>

                </div>

                <div className="booking-right-content col-md-6">
                  <img src={bookingCar} />
                </div>

              </div>
            </div>
          </section>}


        </div>
      </div>
      <div class="booking-footer">
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default BookingForm; 