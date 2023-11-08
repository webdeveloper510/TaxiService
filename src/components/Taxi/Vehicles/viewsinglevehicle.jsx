import React, { useState, useEffect } from "react";
import AppHeader from "../../TopBar/AppHeader";
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
import { useNavigate, useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import backtovehicle from '../../../assets/images/left-arrow.png'
import SuperSideBar from "../SiderNavBar/Sidebar";
import uploadfileImg from '../../../assets/images/upload-btn.png'
import car1 from '../../../assets/images/car1.jpg'
import { getVehicleById } from "../../../utils/api";
import AppLoader from "../../AppLoader";
import checkedImg from "../../../assets/images/checked.png"
const ViewSingleVehicle = () => {

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
            <SuperSideBar/>

            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
              <AppHeader />
              <div className="body flex-grow-1 px-3" style={{ paddingBottom: "20px" }}>
              <h1 class="heading-for-every-page">
                    <Link to="/taxi/vehicle/listofvehicles">
                    <img src={backtovehicle} alt="edit" /> Vehicle Information</Link></h1>
                <div class="active-trip-outer">
                  {/* <h2>Add New Vehicle</h2> */}
                  {/********** vehicle---information---form *****************/}
                 { loading ?<AppLoader></AppLoader> : <CRow>

                    <CCol xs={12}>
                      <CCard className="mb-4">
                        {/* <CCardHeader>
                          <strong>Vehicle Information</strong>
                        </CCardHeader> */}
                        <CCardBody>
                        
                          <form noValidate className="row g-3">
                         
                          <CCol md={5}>
                            
                          <img className="vehicle_img" src={vehicle?.vehicle_photo} alt="Car photo"/>
                           </CCol>
                           
                            <CCol className="vehicle_info_right" md={7}>
                              <CFormLabel htmlFor="inputvehiclenum"><img src={checkedImg}/>Vehicle No. : </CFormLabel>
                              <span className="vehicle_info">{vehicle?.vehicle_number}</span> &nbsp;<br/>
                              <CFormLabel htmlFor="inputvehiclenum"><img src={checkedImg}/>Vehicle Type : </CFormLabel>
                              <span className="vehicle_info"> {vehicle?.vehicle_type}</span><br/>
                              {/* <CFormInput aria-label="vehicle no."
                              style={{cursor: "default"}}
                              readOnly
                                maxLength="50"
                                value={vehicle?.vehicle_number}
                                className=
                                  "form-control bg-transparent"
                                 
                                name="vehicleNo"
                                autoComplete="off" />   */}
                                  <CFormLabel htmlFor="inputvehivlemodal"><img src={checkedImg}/>Vehicle Model :</CFormLabel>
                             
                                 <span className="vehicle_info"> {vehicle?.vehicle_model}</span>&nbsp;<br/>
                                 <CFormLabel htmlFor="inputseating"><img src={checkedImg}/>Seating Capacity :</CFormLabel>
                                 <span className="vehicle_info"> {vehicle?.seating_capacity}</span><br/>
                                 <CFormLabel htmlFor="inputpassenger"><img src={checkedImg}/>Passenger Cancellation Time Limit (in Minutes):</CFormLabel>
                                 <span className="vehicle_info">{vehicle?.cancelation_time_limit}</span>&nbsp;
                                 <CFormLabel htmlFor="inputpassengercharges"><img src={checkedImg}/>Passenger Cancellation Charges (in € ) : </CFormLabel>
                                 <span className="vehicle_info">{vehicle?.cancelation_charges}</span><br/>
                                 <CFormLabel htmlFor="inputpassengercharges"><img src={checkedImg}/>Insurance Renewal Date: </CFormLabel>
                                 <span className="vehicle_info">{moment(vehicle?.insurance_renewal_date).format('MMMM Do YYYY, h:mm a')}</span> &nbsp;<br/>
                                 <CFormLabel htmlFor="inputgender" ><img src={checkedImg}/>Is air conditioner :</CFormLabel>
                                 <span className="vehicle_info">{vehicle?.AC ? "Yes" : "No"}</span>
                            </CCol>

                      
       
{/* 
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
                            </CCol> */}

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

export default ViewSingleVehicle; 