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
} from '@coreui/react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import SuperSideBar from "../SiderNavBar/Sidebar";


const AddNewBookings = () => {
  const [pickupDate, setPickupDate] = useState(new Date());

  const handlePickupDateChange = (date) => {
    setPickupDate(date);
  };
//   const handlepickupDateChange = (date) => {
//     setpickupDate(date);

//     setInputData({
//       ...inputData,
//       pick_up_date: date
//     })

//   };

  return (
    <>
      <div className="container-fluidd">

        <div className="col-md-12">
          <div>
           <SuperSideBar/>

            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
              <AppHeader />
              <div className="body flex-grow-1 px-3" style={{ paddingBottom: "20px" }}>
                <h1 class="heading-for-every-page">Add New Booking</h1>
                <div class="active-trip-outer add_new_bookings">
                <CRow className="passenger-details"> 
                      <CCol xs={12}>
                        <CCard className="mb-4">
                          <CCardHeader>
                            <strong>Passenger Details</strong>

                          </CCardHeader>
                          <CCardBody>
                            <CForm className="row g-3">
                              <CCol md={6}>
                                <CFormLabel htmlFor="inputname">Name</CFormLabel>
                                <CFormInput aria-label="name" name="name" />
                              </CCol>
                              <CCol md={6}>
                                <CFormLabel htmlFor="inputphnno">Phone</CFormLabel>
                                <CFormInput id="inputphnno" name="phone" />
                              </CCol>
                              <CCol md={6}>
                                <CFormLabel htmlFor="inputtemailadd">
                                  Passengers
                                </CFormLabel>
                                <CFormInput id="inputpassenger" name="passenger" />
                              </CCol>
                              <CCol md={6}>
                                <CFormLabel htmlFor="inputtemailadd">
                                  Car Type
                                </CFormLabel>
                                <CFormSelect
                                maxLength="50"
                                className=
                                  "form-control bg-transparent"
                                name="Car_type"
                                autoComplete="off" >

                                <option default>Select Car</option>
                               
                              </CFormSelect>
                              </CCol>
                              <CCol md={6}>
                                <CFormLabel htmlFor="inputpayment">Payment Method</CFormLabel>
                                <CFormInput id="inputpayment_method" name="address" />
                              </CCol>
                            </CForm>
                          </CCardBody>
                        </CCard>
                      </CCol>

                  </CRow>
                  <CRow>

                    <CCol xs={12}>
                      <CCard className="mb-4">
                        <CCardHeader>
                          <strong>Pickup Date and Time</strong>
                        </CCardHeader>
                        <CCardBody>

                          <CForm className="row g-3">
                            <CCol md={6}>
                              <CFormLabel htmlFor="inputpickupdate"> Date & Time</CFormLabel><br />
                                <DatePicker
                                    selected={pickupDate}
                                    onChange={handlePickupDateChange}
                                    showTimeSelect
                                    dateFormat="MM/dd/yyyy HH:mm" // Add time to the date
                                    minDate={moment().toDate()}
                                    className="form-control"
                                    />
                             
                            </CCol>

                            <CCol md={6}>
                              <CFormLabel htmlFor="inputinfo">Additional Information</CFormLabel>
                              <CFormInput id="inputadd_info" name="Additional info" />              
                            </CCol>
                          </CForm>

                        </CCardBody>
                      </CCard>
                    </CCol>
                  </CRow>
                  <CRow>

                        <CCol xs={12}>
                        <CCard className="mb-4">
                            <CCardHeader>
                            <strong>Pickup Address</strong>
                            </CCardHeader>
                            <CCardBody>

                            <CForm className="row g-3">
                            <CCol md={6}>
                                <CFormLabel htmlFor="inputinfoaddrss">Address</CFormLabel>
                                <CFormInput id="inputadd_address" name="adress" />              
                                </CCol>

                                <CCol md={6}>
                                <CFormLabel htmlFor="inputpcode">Postal Code</CFormLabel>
                                <CFormInput id="inputp_code" name="Postal Code" />              
                                </CCol>

                                <CCol xs={6}>
                                <CFormLabel htmlFor="inputstation">Train Station</CFormLabel>
                                <CFormInput id="inputstation" name="station" />              
                                </CCol>

                                <CCol xs={6}>
                                <CFormLabel htmlFor="inputairports">Airports</CFormLabel>
                                <CFormInput id="inputair_ports" name="Airports" />              
                                </CCol>
                            </CForm>

                            </CCardBody>
                        </CCard>
                        </CCol>
                        </CRow>

                        <CRow>

                        <CCol xs={12}>
                        <CCard className="mb-4">
                            <CCardHeader>
                            <strong>Destination</strong>
                            </CCardHeader>
                            <CCardBody>

                            <CForm className="row g-3">
                            <CCol md={6}>
                                <CFormLabel htmlFor="inputinfoaddrss">Address</CFormLabel>
                                <CFormInput id="inputadd_address" name="adress" />              
                                </CCol>

                                <CCol md={6}>
                                <CFormLabel htmlFor="inputpcode">Postal Code</CFormLabel>
                                <CFormInput id="inputp_code" name="Postal Code" />              
                                </CCol>

                                <CCol xs={6}>
                                <CFormLabel htmlFor="inputstation">Train Station</CFormLabel>
                                <CFormInput id="inputstation" name="station" />              
                                </CCol>

                                <CCol xs={6}>
                                <CFormLabel htmlFor="inputairports">Airports</CFormLabel>
                                <CFormInput id="inputair_ports" name="Airports" />              
                                </CCol>
                            </CForm>

                            </CCardBody>
                        </CCard>
                        </CCol>
                        </CRow>
                  <CCol xs={12}>
                    <div className="d-flex justify-content-center" style={{ marginTop: "20px", marginBottom: "20px" }}>
                      <CButton type="submit" className="submit-btn">Book Now</CButton>
                      {/* <CButton type="button" className="cancel-btn">Cancel</CButton> */}
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

export default AddNewBookings; 