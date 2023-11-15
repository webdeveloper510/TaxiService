import React, { useState, useEffect, useContext } from "react";
import AppHeader from "../../TopBar/AppHeader";
import moment from "moment";

// import SuperSideBar from "../../Taxi/SiderNavBar/Sidebar";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

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
import { getTripById, getVehicleById } from "../../../utils/api";
import AppLoader from "../../AppLoader";
import checkedImg from "../../../assets/images/checked.png"
import SuperMap from "../../TaxiMap/Map";
import userContext from "../../../utils/context";
import SuperAdminSideBar from "../../SuperAdmin/Sidebar/SideBar";
const ViewSingleTrip = () => {
  const [trip, setTrip] = useState(null)
  const [customerName, setCustomerName] = useState(null);
  const {vehicleId} = useParams();
  const {user,setUser,appLoaded} = useContext(userContext);
 const navigate = useNavigate();
 const id = useParams().id;
 useEffect(()=>{
  if(appLoaded){
    if(!user){
      navigate("/")
    }
    getTripById(id).then((res)=>{
      console.log("page data for trip",res);
      if(res.code === 200){
        setTrip(res.result)
        if(res.hotelName){setCustomerName(res.hotelName)}
      }
    }).catch((err)=>{
      console.log(err);
    }).finally(()=>{})
  }
 },[appLoaded])

 
  return (
    <>
      <div className="container-fluidd">

        <div className="col-md-12">
          <div>
             {user?.role === "SUPER_ADMIN" && <SuperAdminSideBar/>} 
              {user?.role === "COMPANY" && <SuperSideBar/>}
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
                              <CFormLabel htmlFor="inputvehiclenum"><img src={checkedImg}/>Trip ID. : {trip?.trip_id} </CFormLabel>
                              <span className="vehicle_info"></span> &nbsp;<br/>
                              {customerName && <CFormLabel htmlFor="inputvehiclenum"><img src={checkedImg}/>Customer Name : {customerName}</CFormLabel>}
                              <span className="vehicle_info"> </span><br/>
                             
                                  <CFormLabel htmlFor="inputvehivlemodal"><img src={checkedImg}/>Trip From : {trip?.trip_from?.address}</CFormLabel>
                             
                                 <span className="vehicle_info"> </span>&nbsp;<br/>
                                 <CFormLabel htmlFor="inputseating"><img src={checkedImg}/>Trip To : {trip?.trip_to?.address}</CFormLabel>
                                 <span className="vehicle_info"></span><br/>
                                 <CFormLabel htmlFor="inputpassenger"><img src={checkedImg}/>Date : {moment(trip?.pickup_date_time).format("MMM Do YY")}</CFormLabel>
                                 <span className="vehicle_info"></span><br/>
                                 <CFormLabel htmlFor="inputpassengercharges"><img src={checkedImg}/>Time : {moment(trip?.pickup_date_time).format("h:mm a")} </CFormLabel>
                                 <span className="vehicle_info"></span><br/>
                                {trip?.driver_name && <CFormLabel htmlFor="inputpassengercharges"><img src={checkedImg}/>Drive Name : {trip?.driver_name}</CFormLabel>}
                                 <span className="vehicle_info"></span><br/>
                                {trip?.price && <CFormLabel htmlFor="inputpassengercharges"><img src={checkedImg}/> Fare (in €) : {trip?.price}</CFormLabel>}
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