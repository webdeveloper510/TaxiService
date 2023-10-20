import React, { useState, useEffect } from "react";
import AppHeader from "../../TopBar/AppHeader";
import SideBar2 from "../SideBar2"
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
import { getDriver, getVehicle } from "../../../utils/api";
import { addTrip } from "../../../utils/api";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const AddNewTrip = () => {

  const navigate = useNavigate();

  const [pickupDate, setpickupDate] = useState(new Date());
  const [passengers, setPassengers] = useState([]);
  const [vehicle, setVehicle] = useState();
  const [driver, setDriver] = useState();

  const [inputData, setInputData] = useState({
    driver_name: '',
    vehicle: '',
    trip_from: { address: '' },
    trip_to: { address: '' },
    pick_up_date: '',
    passenger_detail: []
  })

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

    getVehicle().then(res => {
      console.log(res.result, 'vehicle')
      if (res.code === 200) {
        setVehicle(res.result)
      }
    });
  }, [])



  useEffect(() => {
    getDriver().then(res => {
      console.log(res.result, 'vehicle')
      if (res.code === 200) {
        setDriver(res.result)
      }
    })
  }, [])

  const inputHandler = (e) => {
    if (e.target.name === "trip_from" || e.target.name === "trip_to") {
      let trip = inputData[e.target.name]
      trip.address = e.target.value;
      setInputData({ ...inputData, [e.target.name]: trip })
    } else {
      setInputData({
        ...inputData,
        [e.target.name]: e.target.value
      })
    }
  }


  const addOnChangeHandler = (e, index) => {
    let arr = passengers;
    console.log(passengers)
    let obj = arr[index]
    obj[e.target.name] = e.target.value
    arr[index] = obj;
    setPassengers([...arr])
  }


  const adddata = () => {
    let data = inputData
    data.passenger_detail = passengers
    addTrip(data).then((res) => {
      console.log("response---->>>>", res)
      if (res.data.code === 200) {
        toast.success(`${res.data.message}`, {
          position: 'top-right',
          autoClose: 1000,
        });
        navigate("/trips/requestbookings")
      } else {
        toast.warning(`${res.data.message}`, {
          position: 'top-right',
          autoClose: 1000,
        });
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
              <div className="body flex-grow-1 px-3" style={{ paddingBottom: "20px" }}>
                <h1 class="heading-for-every-page">Add New Trip</h1>
                <div class="active-trip-outer">

                  <CRow>

                    <CCol xs={12}>
                      <CCard className="mb-4">
                        <CCardHeader>
                          <strong>Add Trip Details</strong>
                        </CCardHeader>
                        <CCardBody>

                          <CForm className="row g-3">
                            <CCol md={6}>
                              <CFormLabel htmlFor="inputtripdname">Driver Name</CFormLabel>
                              <CFormSelect name="driver_name" onChange={inputHandler}>
                                <option value="">select</option>
                                {driver?.map((e, i) => {
                                  return (
                                    <>
                                      <option value={e._id}>{e.first_name}</option>
                                    </>
                                  )
                                })}


                              </CFormSelect>
                            </CCol>
                            <CCol md={6}>
                              <CFormLabel htmlFor="inputvehicletype">Vehicle</CFormLabel>
                              <CFormSelect name="vehicle" onChange={inputHandler}>
                                <option value="">select</option>
                                {vehicle?.map((e, i) => {
                                  return (
                                    <>
                                      <option value={e._id} >{e.vehicle_model}</option>
                                    </>
                                  )
                                })}

                              </CFormSelect>
                            </CCol>
                            <CCol xs={6}>
                              <CFormLabel htmlFor="inputtripfrom">Trip From</CFormLabel>
                              <CFormInput id="inputtripfrom" name="trip_from" onChange={inputHandler} />
                            </CCol>
                            <CCol xs={6}>
                              <CFormLabel htmlFor="inputtripto">Trip To</CFormLabel>
                              <CFormInput id="inputtripto" name="trip_to" onChange={inputHandler} />
                            </CCol>
                            <CCol md={3}>
                              <CFormLabel htmlFor="inputpickupdate">Pickup Date and Time</CFormLabel><br />
                              <DatePicker
                                selected={pickupDate}
                                onChange={handlepickupDateChange}
                                dateFormat="MM/dd/yyyy"
                                className="form-control"

                              />
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
                                <CFormLabel htmlFor="inputname">Name</CFormLabel>
                                <CFormInput aria-label="name" name="name" onChange={(e) => { addOnChangeHandler(e, index) }} />
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
                    <div className="d-flex justify-content-center" style={{ marginTop: "40px" }}>
                      <CButton type="submit" className="submit-btn" onClick={adddata}>Submit</CButton>
                      <CButton type="button" className="cancel-btn">Cancel</CButton>
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

export default AddNewTrip; 