import React, { useState, useEffect } from "react";
import AppHeader from "../../TopBar/AppHeader";
import SideBar2 from "../SideBar2"
// import SuperSideBar from "../../SuperAdminDashboard/SiderNavBar/Sidebar";
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
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import backtovehicle from '../../../assets/images/left-arrow.png'
const EditpendingTrip = () => {


  const navigate = useNavigate();

  const [pickupDate, setpickupDate] = useState(new Date());
  const [passengers, setPassengers] = useState([]);
  const [vehicle, setVehicle] = useState();


  const handlepickupDateChange = (date) => {
    setpickupDate(date);

    

  };

  const addPassenger = () => {
    setPassengers([...passengers, { name: '', email: '', phone: '', address: '' }]);
  };

  const removePassenger = (index) => {
    const updatedPassengers = passengers.filter((_, i) => i !== index);
    setPassengers(updatedPassengers);
  };






  // useEffect(() => {
  //   getDriver().then(res => {
  //     console.log(res.result, 'vehicle')
  //     if (res.code === 200) {
  //       setDriver(res.result)
  //     }
  //   })






 
  return (
    <>
      <div className="container-fluidd">

        <div className="col-md-12">
          <div>
            <SideBar2 />

            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
              <AppHeader />
              <div className="body flex-grow-1 px-3" style={{ paddingBottom: "20px" }}>
              <h1 class="heading-for-every-page">
                    <Link to="/trips/pendingtrips">
                    <img src={backtovehicle} alt="edit" /> Edit Pending Trip</Link></h1>
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
                              <CFormSelect name="vehicle" >
                                <option default>Select Vehicle</option>
                                <option>Test</option>

                              </CFormSelect>
                            
                            </CCol>

                            <CCol md={6}>
                              <CFormLabel htmlFor="inputpickupdate">Pickup Date and Time</CFormLabel><br />
                              <DatePicker
                                selected={pickupDate}
                                onChange={handlepickupDateChange} // Add this line to handle date changes
                                dateFormat="MM/dd/yyyy"
                                className="form-control"
                                minDate={moment().toDate()}
/>
                          
                            </CCol>

                            <CCol xs={6}>
                              <CFormLabel htmlFor="inputtripfrom">Trip From</CFormLabel>
                              <CFormSelect
                                maxLength="50"
                                className=
                                  "form-control bg-transparent"
                                name="vehicle_type"
                                autoComplete="off" >

                                <option default></option>
                               
                              </CFormSelect>
                             
                           
                            </CCol>
                            <CCol xs={6}>
                              <CFormLabel htmlFor="inputtripto">Trip To</CFormLabel>
                              <CFormSelect
                                maxLength="50"
                                className=
                                  "form-control bg-transparent"
                                name="vehicle_type"
                                autoComplete="off" >

                                <option default></option>
                               
                              </CFormSelect>
                              {/* <CFormInput id="inputtripto" name="trip_to" onChange={inputHandler} /> */}
                           
                              
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
                                <CFormInput aria-label="name" name="name" />
                           
                              </CCol>
                              <CCol xs={6}>
                                <CFormLabel htmlFor="inputphnno">Phone</CFormLabel>
                                <CFormInput id="inputphnno" name="phone" />
                              </CCol>
                              <CCol xs={6}>
                                <CFormLabel htmlFor="inputtemailadd">
                                  Email Address
                                </CFormLabel>
                                <CFormInput id="inputemailadd" name="email" />
                              </CCol>
                              <CCol xs={6}>
                                <CFormLabel htmlFor="inputaddress">Address</CFormLabel>
                                <CFormInput id="inputaddress" name="address" />
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
                      <CButton type="submit" className="submit-btn">Submit</CButton>
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

export default EditpendingTrip; 