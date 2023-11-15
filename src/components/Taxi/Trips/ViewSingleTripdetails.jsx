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
import SuperMap from "../../TaxiMap/Map";
const ViewSingleTrip = ({role}) => {

  const {vehicleId} = useParams();
 
 

 
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
               <Link to="/taxi/dashboard" className="view_detail">
                    <img src={backtovehicle} alt="edit" /> View Trip Details
                    </Link>
                    </h1>
                   
                <div class="active-trip-outer">
                  {/* <h2>Add New Vehicle</h2> */}
                  {/********** vehicle---information---form *****************/}
                 <CRow>

                    <CCol xs={12}>
                      <CCard className="mb-4">
                        {/* <CCardHeader>
                          <strong>Vehicle Information</strong>
                        </CCardHeader> */}
                        <CCardBody>
                        
                          <form noValidate className="row g-3">
                         
                          <CCol md={5} className="single-trip-map">
                            
                          <SuperMap/>
                          {/* <img className="vehicle_img" src={} alt="Car photo"/> */}
                           </CCol>
                           
                            <CCol className="vehicle_info_right" md={7}>
                              <CFormLabel htmlFor="inputvehiclenum"><img src={checkedImg}/>Trip ID. : </CFormLabel>
                              <span className="vehicle_info"></span> &nbsp;<br/>
                              <CFormLabel htmlFor="inputvehiclenum"><img src={checkedImg}/>Customer Name : </CFormLabel>
                              <span className="vehicle_info"> </span><br/>
                             
                                  <CFormLabel htmlFor="inputvehivlemodal"><img src={checkedImg}/>Trip From :</CFormLabel>
                             
                                 <span className="vehicle_info"> </span>&nbsp;<br/>
                                 <CFormLabel htmlFor="inputseating"><img src={checkedImg}/>Trip To :</CFormLabel>
                                 <span className="vehicle_info"></span><br/>
                                 <CFormLabel htmlFor="inputpassenger"><img src={checkedImg}/>Date :</CFormLabel>
                                 <span className="vehicle_info"></span><br/>
                                 <CFormLabel htmlFor="inputpassengercharges"><img src={checkedImg}/>Time : </CFormLabel>
                                 <span className="vehicle_info"></span><br/>
                                 <CFormLabel htmlFor="inputpassengercharges"><img src={checkedImg}/>Drive Name : </CFormLabel>
                                 <span className="vehicle_info"></span><br/>
                                 <CFormLabel htmlFor="inputpassengercharges"><img src={checkedImg}/> Fare (in €) : </CFormLabel>
                                 <span className="vehicle_info"></span><br/>
                                 
                            </CCol>

                      
       


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

export default ViewSingleTrip; 