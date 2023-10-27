import React, { useState, useEffect } from "react";
import AppHeader from "../../TopBar/AppHeader";
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
import SuperSideBar from "../SiderNavBar/Sidebar";
import uploadfileImg from '../../../assets/images/upload-btn.png'
import car1 from '../../../assets/images/car1.jpg'
const ViewSingleVehicle = () => {


  const navigate = useNavigate();

  const [pickupDate, setpickupDate] = useState(new Date());


  const handlepickupDateChange = (date) => {
    setpickupDate(date);
  };


 
  return (
    <>
      <div className="container-fluidd">

        <div className="col-md-12">
          <div>
            <SuperSideBar/>

            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
              <AppHeader />
              <div className="body flex-grow-1 px-3" style={{ paddingBottom: "20px" }}>
              <h1 class="heading-for-every-page">
                    <Link to="/superadmindashboard/vehicle/listofvehicles">
                    <img src={backtovehicle} alt="edit" /> View Vehicle Details</Link></h1>
                <div class="active-trip-outer">
                  {/* <h2>Add New Vehicle</h2> */}
                  {/********** vehicle---information---form *****************/}
                  <CRow>

                    <CCol xs={12}>
                      <CCard className="mb-4">
                        <CCardHeader>
                          <strong>Vehicle Infromation</strong>
                        </CCardHeader>
                        <CCardBody>
                        
                          <form noValidate className="row g-3">
                          <CRow>
                          <CCol md={4}>
                            
                        <img src={car1} alt="danger"/>
                           </CCol>
                           </CRow>
                            <CCol md={6}>
                              <CFormLabel htmlFor="inputvehiclenum">Vehicle No.</CFormLabel>
                              <CFormInput aria-label="vehicle no."
                                maxLength="50"
                                className=
                                  "form-control bg-transparent"
                                 
                                name="vehicleNo"
                                autoComplete="off" />  
                            </CCol>

                            <CCol md={6}>
                              <CFormLabel htmlFor="inputvehicletype">Vehicle Type</CFormLabel>
                              <CFormSelect
                                maxLength="50"
                                className=
                                  "form-control bg-transparent"
                                name="vehicle_type"
                                autoComplete="off" >

                                <option default>Select Vehicle</option>
                               
                              </CFormSelect>
                            </CCol>

                            <CCol xs={6}>
                              <CFormLabel htmlFor="inputvehivlemodal">Vehicle Model</CFormLabel>
                              <CFormInput
                                maxLength="50"
                                className=
                                  "form-control bg-transparent" 
                                name="vehicleModal"
                                autoComplete="off" />
                            </CCol>

                            <CCol xs={6}>
                              <CFormLabel htmlFor="inputseating">Seating Capacity</CFormLabel>
                              <CFormInput
                                maxLength="50"
                                className=
                                  "form-control bg-transparent"
                                name="seatingCapacity"
                                autoComplete="off" />
                            
                            </CCol>
                            <CCol xs={6}>
                              <CFormLabel htmlFor="inputpassenger">Passenger Cancellation Time Limit (in Minutes)</CFormLabel>
                              <CFormInput id="inputpassengertimelimit"
                                maxLength="50"
                                className=
                                  "form-control bg-transparent"
                                name="passengerTimeLimit"
                                autoComplete="off" />
                            </CCol>
                            <CCol xs={6}>
                              <CFormLabel htmlFor="inputpassengercharges">Passenger Cancellation Charges (in € ) </CFormLabel>
                              <CFormInput id="inputpassengercharges"
                                maxLength="50"
                                className=
                                  "form-control bg-transparent"    
                                name="passengerCharges"
                                autoComplete="off" /> 
                            </CCol>

                            <CCol md={6} className="date_pic">
                              <CFormLabel htmlFor="inputinsurancedate">Insurance Renewal Date</CFormLabel><br />
                              {/* <DatePicker
                                selected={vehicleinsuranceDate}
                                onChange={handlevehicleInsuranceDateChange}
                                dateFormat="MM/dd/yyyy"
                                maxLength="50"
                                className={clsx(
                                  "form-control bg-transparent" 
                                name="vehicleinsuranceDate"
                                autoComplete="off" /> */}
                                <DatePicker
                                    selected={pickupDate}
                                    onChange={handlepickupDateChange} // Add this line to handle date changes
                                    dateFormat="MM/dd/yyyy"
                                    className="form-control"
                                    minDate={moment().toDate()}
                                    />
                            </CCol>

                            <CCol md={6}>
                              <CFormLabel htmlFor="inputgender" ></CFormLabel>
                              <fieldset className="row mb-12">
                                <CCol sm={12} className="mt-3">
                                  <CFormCheck inline
                                    type="radio"
                                    name="gridRadios"
                                    id="gridRadios1"
                                    value="true"
                                    label="AC"
                                  // Add the onChange event handler
                                  // Set the checked state if Male is selected
                                  />
                                  <CFormCheck inline
                                    type="radio"
                                    name="gridRadios"
                                    id="gridRadios2"
                                    value="false"
                                    label="NON-AC"
                                  // Add the onChange event handler
                                   // Set the checked state if Female is selected
                                  />
                                </CCol>
                              </fieldset>
                            </CCol>

                            {/* <CCol md={6} className="upload-file-input">
                              <CFormLabel htmlFor="inputmobile">Upload Vehicle Image</CFormLabel>
                              <CFormLabel htmlFor="formFile"></CFormLabel> 
                              <CFormInput type="file" id="formFile"

                                maxLength="50"
                                className=
                                  "form-control bg-transparent"
                                name="file"
                                autoComplete="off" />
                         
                              <label htmlFor="formFile" className="custom-file-upload">
                                <div className="files-outer">
                                  <img className="upload-icon" src={uploadfileImg} /><br /><br />
                                  <span>Drop Image Here ...</span>
                                </div>
                              </label>
                            </CCol> */}

                          </form>
                        </CCardBody>
                      </CCard>
                    </CCol>
                  </CRow>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>

    </>
  );
};

export default ViewSingleVehicle; 