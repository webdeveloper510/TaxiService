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
import { useNavigate, useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import backtovehicle from '../../../assets/images/left-arrow.png'
import uploadfileImg from '../../../assets/images/upload-btn.png'
import car1 from '../../../assets/images/car1.jpg'
import { getVehicleById } from "../../../utils/api";
import AppLoader from "../../AppLoader";
import SideBar2 from "../SideBar2";
const ViewSingleSubVehicle = () => {

  const {vehicleId} = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null)
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  function onLoadComponent() {
    setLoading(true);
    if (vehicleId) {
      console.log("vehdicle id from param", vehicleId)
      getVehicleById(vehicleId).then(res => {
        console.log(res?.result, 'vehicleData')
        if (res?.code === 200) {
          const { result } = res;
          setVehicle(res?.result)
          setLoading(false)
        } else {
          setError(true);
          setLoading(false)
        }

      }).catch(err => { setError(true); setLoading(false) });
     
    }
  }
  useEffect(() => {

    onLoadComponent()
  }, [])

 
  return (
    <>
      <div className="container-fluidd">

        <div className="col-md-12">
          <div>
           <SideBar2/>

            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
              <AppHeader />
              <div className="body flex-grow-1 px-3" style={{ paddingBottom: "20px" }}>
              <h1 class="heading-for-every-page">
                    <Link to="/vehicle/viewallvehicle">
                    <img src={backtovehicle} alt="edit" /> View sub Vehicle  Details</Link></h1>
                <div class="active-trip-outer">
                  {/* <h2>Add New Vehicle</h2> */}
                  {/********** vehicle---information---form *****************/}
                 { loading ?<AppLoader></AppLoader> : <CRow>

                    <CCol xs={12}>
                      <CCard className="mb-4">
                        <CCardHeader>
                          <strong>Vehicle Infromation</strong>
                        </CCardHeader>
                        <CCardBody>
                        
                          <form noValidate className="row g-3">
                          <CRow>
                          <CCol md={4}>
                            
                        <img className="vehicle_img" src={vehicle?.vehicle_photo || car1} alt="danger"/>
                           </CCol>
                           </CRow>
                            <CCol md={6}>
                              <CFormLabel htmlFor="inputvehiclenum">Vehicle No.</CFormLabel>
                              <CFormInput aria-label="vehicle no."
                              style={{cursor: "default"}}
                              readOnly
                                maxLength="50"
                                value={vehicle?.vehicle_number}
                                className=
                                  "form-control bg-transparent"
                                 
                                name="vehicleNo"
                                autoComplete="off" />  
                            </CCol>

                            <CCol md={6}>
                              <CFormLabel htmlFor="inputvehiclenum">Vehicle Type</CFormLabel>
                              <CFormInput aria-label="vehicleType"
                              style={{cursor: "default"}}
                              readOnly
                                maxLength="50"
                                value={vehicle?.vehicle_type}
                                className=
                                  "form-control bg-transparent"
                                 
                                name="vehicleType"
                                autoComplete="off" />  
                            </CCol>

                            <CCol xs={6}>
                              <CFormLabel htmlFor="inputvehivlemodal">Vehicle Model</CFormLabel>
                              <CFormInput
                              readOnly
                              style={{cursor: "default"}}
                              value={vehicle?.vehicle_model}
                                maxLength="50"
                                className=
                                  "form-control bg-transparent" 
                                name="vehicleModal"
                                autoComplete="off" />
                            </CCol>

                            <CCol xs={6}>
                              <CFormLabel htmlFor="inputseating">Seating Capacity</CFormLabel>
                              <CFormInput
                              readOnly
                              style={{cursor: "default"}}
                              value={vehicle?.seating_capacity}
                                maxLength="50"
                                className=
                                  "form-control bg-transparent"
                                name="seatingCapacity"
                                autoComplete="off" />
                            
                            </CCol>
                            <CCol xs={6}>
                              <CFormLabel htmlFor="inputpassenger">Passenger Cancellation Time Limit (in Minutes)</CFormLabel>
                              <CFormInput id="inputpassengertimelimit"
                              readOnly
                              style={{cursor: "default"}}
                              value={vehicle?.cancelation_time_limit}
                                maxLength="50"
                                className=
                                  "form-control bg-transparent"
                                name="passengerTimeLimit"
                                autoComplete="off" />
                            </CCol>
                            <CCol xs={6}>
                              <CFormLabel htmlFor="inputpassengercharges">Passenger Cancellation Charges (in € ) </CFormLabel>
                              <CFormInput id="inputpassengercharges"
                              readOnly
                              style={{cursor: "default"}}
                                maxLength="50"
                                value={vehicle?.cancelation_charges}
                                className=
                                  "form-control bg-transparent"    
                                name="passengerCharges"
                                autoComplete="off" /> 
                            </CCol>
                            <CCol xs={6} className="date_pic">
                              <CFormLabel htmlFor="inputpassengercharges">Insurance Renewal Date (in € ) </CFormLabel>
                              <CFormInput id="inputpassengercharges"
                              readOnly
                              style={{cursor: "default"}}
                                maxLength="50"
                                value={moment(vehicle?.insurance_renewal_date).format('MMMM Do YYYY, h:mm a')}
                                className="form-control"
                                name="inputinsurancedate"
                                autoComplete="off" /> 
                            </CCol>
                            {/* <CCol md={6} className="date_pic">
                              <CFormLabel htmlFor="inputinsurancedate">Insurance Renewal Date</CFormLabel><br />
                        
                                <DatePicker
                                    selected={new Date(vehicle?.insurance_renewal_date)}
                                 
                            
                                    dateFormat="MM/dd/yyyy"
                                    className="form-control"
                
                                    />
                            </CCol> */}

                            <CCol md={6}>
                              <CFormLabel htmlFor="inputgender" ></CFormLabel>
                              <fieldset className="row mb-12">
                                <CCol sm={12} className="mt-3">
                                  <CFormCheck inline
                                  readOnly
                                    type="radio"
                                    name="gridRadios"
                                    id="gridRadios1"
                                    checked= {vehicle?.AC}
                                    label="AC"
                                  // Add the onChange event handler
                                  // Set the checked state if Male is selected
                                  />
                                  <CFormCheck inline
                                  readOnly
                                    type="radio"
                                    name="gridRadios"
                                    id="gridRadios2"
                                    checked= {!vehicle?.AC}
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
                  </CRow>}
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>

    </>
  );
};

export default ViewSingleSubVehicle; 