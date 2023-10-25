import React, { useState, useEffect } from "react";
import AppHeader from "../../TopBar/AppHeader";
import SideBar2 from "../SideBar2"
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
import { getDriver, getVehicle, getVehicleType } from "../../../utils/api";
import { addTrip } from "../../../utils/api";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";


const RequestNewTrip = () => {

  const navigate = useNavigate();

  const [pickupDate, setpickupDate] = useState(new Date());
  const [passengers, setPassengers] = useState([]);
  const [vehicle, setVehicle] = useState();
  const [inputData, setInputData] = useState({
    vehicle: '',
    trip_from: {  address: '', lat: null , log: null },
    trip_to: { address: '', lat: null , log: null },
    pick_up_date: new Date(),
    passenger_detail: []
  })

  const [errors, setErrors] = useState(
    {
      vehicle: null,
      trip_from: null,
      trip_to: null,
      pick_up_date: null,
      passenger_detail: []
    }
  )


  const handlepickupDateChange = (date) => {
    setpickupDate(date);

    setInputData({
      ...inputData,
      pick_up_date: date
    })

  };

  const addPassenger = () => {
    setPassengers([...passengers, { name: '', email: '', phone: '', address: '' }]);
  };

  const removePassenger = (index) => {
    const updatedPassengers = passengers.filter((_, i) => i !== index);
    setPassengers(updatedPassengers);
  };


  useEffect(() => {
    getVehicleType().then(res => {
      console.log(res.result, 'vehicleType')
      if (res.code === 200) {
        setVehicle(res.result)
      }
    });
  }, [])



  // useEffect(() => {
  //   getDriver().then(res => {
  //     console.log(res.result, 'vehicle')
  //     if (res.code === 200) {
  //       setDriver(res.result)
  //     }
  //   })


  const inputHandler = (e) => {
      if(e.target.value.length < 1){
        setErrors({...errors, [e.target.name]: true })
      }else{
        setErrors({...errors, [e.target.name]: false })
      }
      console.log("errors====>>>>",errors)
      setInputData({
        ...inputData,
        [e.target.name]: e.target.value
      })
  }


  const addOnChangeHandler = (e, index) => {
    let arr = passengers;
    let obj = arr[index]
    obj[e.target.name] = e.target.value
    arr[index] = obj;
    setPassengers([...arr])
  }


  const adddata = () => {
    let data = inputData
    let valid = true
    let newErrors = {...errors}
    console.log("data beafore vehicle", vehicle)
    if(!data.trip_from.lat || !data.trip_from.log || data.trip_from.address.length < 1){
      console.log("enter valid trip from")
      valid = false;
      newErrors.trip_from = "Please enter valid trip from address";
    }
    if(!data.trip_to.lat || !data.trip_to.log || data.trip_to.address.length < 1){
      valid = false;
      newErrors.trip_to = "Please enter valid trip to address";
      
    }
    if(data.vehicle.length < 1){
      valid = false;
      newErrors.vehicle = "Please select valid vehicle";
      
    }
    if(inputData.pick_up_date.length < 1){
      valid = false;
      newErrors.pick_up_date=  "Please select valid pick-up date";
    }
    if(!valid){
      setErrors(newErrors)
      return console.log(errors)
    }
    data.passenger_detail = passengers
    console.log("data beafore api", data)
    if (data.passenger_detail.length > 0) {
      data.vehicle_type = data.vehicle
      delete data.vehicle
      addTrip(data).then((res) => {
        console.log("response---->>>>", res)
        if (res.data.code === 200) {
          toast.success(`${res.data.message}`, {
            position: 'top-right',
            autoClose: 1000,
          });
          navigate("/trips/pendingtrips")
        } else {
          toast.warning(`${res.data.message}`, {
            position: 'top-right',
            autoClose: 1000,
          });
        }
      })
    } else {
      toast.warning("Please Enter Passenger Detail", {
        position: 'top-right',
        autoClose: 1000,
      });
    }



  }
  const [tripFrom, setTripFrom] = useState("");
  const [tripFromCoordinates, setTripFromCoordinates] = useState(null);
  const [tripTo, setTrimTo] = useState("");
  const [tripToCoordinates, setTripToCoordinates] = useState(null);
  const handleSelectTripFrom = async (selectedAddress) => {
    try {
      const results = await geocodeByAddress(selectedAddress);
      const latLng = await getLatLng(results[0]);
      setErrors({...errors, trip_from: null})
      const newInputData = inputData;
      inputData.trip_from.address = selectedAddress
      inputData.trip_from.lat = latLng.lat
      inputData.trip_from.log = latLng.lng
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
      setErrors({...errors, trip_to: null})
      const newInputData = inputData;
      inputData.trip_to.address = selectedAddress
      inputData.trip_to.lat = latLng.lat
      inputData.trip_to.log = latLng.lng
      setInputData(newInputData);
      setTrimTo(selectedAddress);
      setTripToCoordinates(latLng);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <>
      <div className="container-fluidd">

        <div className="col-md-12">
          <div>
            <SideBar2 />

            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
              <AppHeader />
              <div className="body flex-grow-1 px-3" style={{ paddingBottom: "20px" }}>
                <h1 class="heading-for-every-page">Add New Trip</h1>
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
                              <CFormLabel htmlFor="inputvehicletype">Vehicle Type</CFormLabel>
                              <CFormSelect name="vehicle"
                              onChange={(data)=>{
                                console.log(data.target.value);
                                setInputData({...inputData,vehicle:data.target.value});
                                if(data.target.value < 1){
                                  setErrors({...errors, vehicle: "Please select vehicle"})
                                }else{
                                  setErrors({...errors, vehicle: null})
                                }
                              }}
                              >
                                <option default>Select Vehicle</option>
                                {vehicle?.map((e, i) => {
                                  return (
                                    <>
                                      <option value={e.name} >{e.name}</option>
                                    </>
                                  )
                                })}

                              </CFormSelect>
                              {errors.vehicle && <span style={{color: "red"}} className="text-danger">{errors.vehicle}</span>}
                            </CCol>

                            <CCol md={6}>
                              <CFormLabel htmlFor="inputpickupdate">Pickup Date and Time</CFormLabel><br />
                              <DatePicker
                                selected={pickupDate}
                                dateFormat="MM/dd/yyyy"
                                className="form-control"
                                minDate={moment().toDate()}
                                onChange={(data)=>{
                                  console.log(data);
                                  setInputData({...inputData, pick_up_date:data});
                                  if(data < 1){
                                    setErrors({...errors, pick_up_date: "Please add valid date for pickup date"})
                                  }else{
                                    setErrors({...errors, pick_up_date: null})
                                  }
                                }}

                              />
                              {errors.pick_up_date && <span style={{color: "red"}} className="text-danger">{errors.pick_up_date}</span>}
                            </CCol>

                            <CCol xs={6}>
                              <CFormLabel htmlFor="inputtripfrom">Trip From</CFormLabel>
                              {/* <CFormInput id="inputtripfrom" name="trip_from" onChange={inputHandler} /> */}
                              {/* <Autocomplete
                                apiKey={"AIzaSyD3i9Ft7G8S38xbkfRgvonQru-sbvNYd5M"}
                                onPlaceSelected={(place) => {
                                  updateTripFrom(place)
                                }}
                              /> */}
                              
                                <PlacesAutocomplete
                                  value={tripFrom}
                                  onChange={(data)=>{
                                    console.log(data);
                                    setTripFrom(data);
                                    if(data < 1){
                                      setErrors({...errors, trip_from: "Please add valid trip from address"})
                                    }else{
                                      setErrors({...errors, trip_from: null})
                                    }
                                  }}
                                  onSelect={handleSelectTripFrom}
                                >
                                  {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                    <div>
                                      <CFormInput id="inputtripfrom"
                                        {...getInputProps({
                                          placeholder: "Enter a location",
                                        })}
                                      />
                                      <div className="suugestion-div">
                                        <div className="suggestion-inner">
                                        {loading && <div>Loading...</div>}
                                        {suggestions.slice(0, 3).map((suggestion) => (
                                          <div
                                            key={suggestion.id}
                                            {...getSuggestionItemProps(suggestion)}
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
                              {errors.trip_from && <span style={{color: "red"}} className="text-danger">{errors.trip_from}</span>}
                            </CCol>
                            <CCol xs={6}>
                              <CFormLabel htmlFor="inputtripto">Trip To</CFormLabel>
                              {/* <CFormInput id="inputtripto" name="trip_to" onChange={inputHandler} /> */}
                              <PlacesAutocomplete
                                  value={tripTo}
                                  onChange={(data)=>{
                                    console.log(data);
                                    setTrimTo(data);
                                    if(data < 1){
                                      setErrors({...errors, trip_to: "Please add valid trip to address"})
                                    }else{
                                      setErrors({...errors, trip_to: null})
                                    }
                                  }}
                                  onSelect={handleSelectTripTo}
                                >
                                  {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                    <div>
                                      <CFormInput id="inputtripto"
                                        {...getInputProps({
                                          placeholder: "Enter a location",
                                        })}
                                      />
                                      <div className="suugestion-div">
                                        <div className="suggestion-inner">
                                        {loading && <div>Loading...</div>}
                                        {suggestions.slice(0, 3).map((suggestion) => (
                                          <div
                                            key={suggestion.id}
                                            {...getSuggestionItemProps(suggestion)}
                                          >
                                            {suggestion.description}
                                          </div>
                                        ))}
                                      </div>
                                      </div>
                                    </div>
                                  )}
                                </PlacesAutocomplete>
                                {errors.trip_to && <span style={{color: "red"}} className="text-danger">{errors.trip_to}</span>}
                            </CCol>

                          </CForm>

                        </CCardBody>
                      </CCard>
                    </CCol>
                  </CRow>


                  <CRow className="passenger-details">
                    {passengers.map((passenger, index) => {
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
                                <CFormLabel htmlFor="inputname">Name</CFormLabel>
                                <CFormInput aria-label="name" name="name" onChange={(e) => { addOnChangeHandler(e, index) 
                                if(e.target.value<1){
                                  error.name = true

                                }else{
                                  error.name = false
                                }
                                console.log(error)
                              }
            
                              } />
                              {error.name && <span style={{color:"red"}}>Name is required</span>}
                              </CCol>
                              <CCol xs={6}>
                                <CFormLabel htmlFor="inputphnno">Phone</CFormLabel>
                                <CFormInput id="inputphnno" name="phone" onChange={(e) => { addOnChangeHandler(e, index) }} />
                              </CCol>
                              <CCol xs={6}>
                                <CFormLabel htmlFor="inputtemailadd">
                                  Email Address
                                </CFormLabel>
                                <CFormInput id="inputemailadd" name="email" onChange={(e) => { addOnChangeHandler(e, index) }} />
                              </CCol>
                              <CCol xs={6}>
                                <CFormLabel htmlFor="inputaddress">Address</CFormLabel>
                                <CFormInput id="inputaddress" name="address" onChange={(e) => { addOnChangeHandler(e, index) }} />
                              </CCol>
                            </CForm>
                          </CCardBody>
                        </CCard>
                      </CCol>
                    )}
                    )}
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
                    <div className="d-flex justify-content-center" style={{ marginTop: "40px" }}>
                      <CButton type="submit" className="submit-btn" onClick={adddata}>Submit</CButton>
                      <CButton onClick={()=>{
                        navigate("/trips/pendingtrips")
                      }} type="button" className="cancel-btn">Cancel</CButton>
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