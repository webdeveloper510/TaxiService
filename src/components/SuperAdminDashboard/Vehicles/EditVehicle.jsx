import React, { useState } from "react";
import AppHeader from "../../TopBar/AppHeader";
// import PlacesAutocomplete, {
//   geocodeByAddress,
//   getLatLng,
// } from "react-places-autocomplete";
import moment from "moment";
import {
  CButton,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
  CCard,
} from '@coreui/react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import SuperSideBar from "../SiderNavBar/Sidebar";
import uploadfileImg from '../../../assets/images/upload-btn.png'
import backtovehicle from '../../../assets/images/left-arrow.png'
import { Link } from 'react-router-dom';
const EditVehicle = () => {
  const [visible, setVisible] = useState(false)
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
                <h1 class="heading-for-every-page edit_vehicles">
                <Link to="/superadmindashboard/vehicle/listofvehicles">
                <img src={backtovehicle} alt="edit"/> Edit Vehicle Details</Link></h1>
               
               
             
                <div class="active-trip-outer add_new_bookings">
                <CRow className="passenger-details"> 
                      <CCol xs={12}>
                        <CCard className="mb-4">
                          <CCardHeader>
                            <strong>Basic Information</strong>

                          </CCardHeader>
                          <CCardBody>
                            <CForm className="row g-3">
                              <CCol md={6}>
                                <CFormLabel htmlFor="inputname">Vehicle Number</CFormLabel>
                                <CFormInput aria-label="name" name="name" />
                              </CCol>
                              <CCol md={6}>
                                <CFormLabel htmlFor="inputtemailadd">
                                 Vehicle  Type
                                </CFormLabel>
                                <CFormSelect
                                maxLength="50"
                                className=
                                  "form-control bg-transparent"
                                name="Car_type"
                                autoComplete="off" >

                                <option default>Select Vehicle </option>
                               
                              </CFormSelect>
                              </CCol>
                              <CCol md={6}>
                                <CFormLabel htmlFor="inputmodal">Vehicle Modal</CFormLabel>
                                <CFormInput id="inputmodal" name="phone" />
                              </CCol>
                              <CCol md={6}>
                                <CFormLabel htmlFor="inputcapacity">
                                 Seating Capacity
                                </CFormLabel>
                                <CFormInput id="inputcapacity" name="Seating Capacity" />
                              </CCol>
                              <CCol md={6}>
                                <CFormLabel htmlFor="inputprice">
                                  Price Per K/M (in €)
                                </CFormLabel>
                                <CFormInput id="inputprice" name="price per km" />
                              </CCol>
                              <CCol md={6}>
                                <CFormLabel htmlFor="inputprice">
                                  Price Per Min (in €)
                                </CFormLabel>
                                <CFormInput id="inputpricemin" name="price per min" />
                              </CCol>
                              <CCol md={6}>
                                <CFormLabel htmlFor="inputfare">
                                  Minimum Fare (in €)
                                </CFormLabel>
                                <CFormInput id="inputminfare" name="min fare" />
                              </CCol>

                              <CCol md={6}>
                                <CFormLabel htmlFor="inputcom">
                                  Commission (in %)
                                </CFormLabel>
                                <CFormInput id="inputCommission" name="Commission" />
                              </CCol>

                              <CCol md={6}>
                                <CFormLabel htmlFor="inputcom">
                                Passenger Cancellation Time Limit (in Minute)
                                </CFormLabel>
                                <CFormInput id="inputlimit" name="limit" />
                              </CCol>

                              <CCol md={6}>
                                <CFormLabel htmlFor="inputcom">
                                Passenger Cancellation Charges (in €)
                                </CFormLabel>
                                <CFormInput id="inputlimitcharges" name="charges" />
                              </CCol>

                              
                              <CCol md={6}>
                              <CFormLabel htmlFor="inputpickupdate"> Insurance Renewal date</CFormLabel><br />
                                <DatePicker
                                    selected={pickupDate}
                                    onChange={handlePickupDateChange}
                                    dateFormat="MM/dd/yyyy" // Add time to the date
                                    minDate={moment().toDate()}
                                    className="form-control"
                                    />
                              </CCol>

                              <CCol md={12} className="upload-file-input">
                              <CFormLabel htmlFor="inputmobile">Upload Vehicle Image</CFormLabel>
                              <CFormLabel htmlFor="formFile"></CFormLabel>
                              <CFormInput type="file" id="formFile"
                                maxLength="50"
                                className=
                                  "form-control bg-transparent"
                                autoComplete="off" />
                              
                              <label htmlFor="formFile" className="custom-file-upload">
                                <div className="files-outer">
                                  <img className="upload-icon" src={uploadfileImg} /><br /><br />
                                  <span>Drop Image Here ...</span>
                                </div>
                              </label>
                            </CCol>
                            </CForm>
                          </CCardBody>
                        </CCard>
                      </CCol>

                  </CRow>
               
             
                  <CCol xs={12}>
                    <div className="d-flex justify-content-center" style={{ marginTop: "20px", marginBottom: "20px" }}>
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

export default EditVehicle;