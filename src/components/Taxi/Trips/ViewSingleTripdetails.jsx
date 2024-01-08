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
import SidebarDriver from "../../Driver/Sidebar";
import SideBar2 from "../../Hotel/SideBar2";
const ViewSingleTrip = () => {
  const [trip, setTrip] = useState(null)
  const [customerName, setCustomerName] = useState(null);
  const [loading, setLoading] = useState(false);
  const { vehicleId } = useParams();
  const { user, setUser, appLoaded } = useContext(userContext);
  const navigate = useNavigate();
  const id = useParams().id;
  useEffect(() => {
    if (appLoaded) {
      if (!user) {
        navigate("/")
      }
      setLoading(true);
      getTripById(id).then((res) => {
        console.log("page data for trip", res);
        if (res.code === 200) {
          setTrip(res.result)
          if (res.hotelName) { setCustomerName(res.hotelName) }
        }
      }).catch((err) => {
        console.log(err);
      }).finally(() => {
        setLoading(false);
      })
    }
  }, [appLoaded])


  return (
    <>
      <div className="container-fluidd">

        <div className="col-md-12">
          <div>
            {user?.role === "SUPER_ADMIN" && <SuperAdminSideBar />}
            {user?.role === "COMPANY" && <SuperSideBar />}
            {user?.role === "DRIVER" && <SidebarDriver />}
            {user?.role === "HOTEL" && <SideBar2 />}

            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
              <AppHeader />
              {loading ? <AppLoader /> : <div className="body flex-grow-1 px-3" style={{ paddingBottom: "20px" }}>
                <h1 class="heading-for-every-page">
                  <Link to="/" className="view_detail">
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

                          <form noValidate className="row g-3 view_single_trip_form">

                            <CCol md={5} className="single-trip-map">

                              <SuperMap />
                              {/* <img className="vehicle_img" src={} alt="Car photo"/> */}
                            </CCol>

                            <CCol className="vehicle_info_right" md={7}>
                              <div class="trip-details">
                                <CFormLabel htmlFor="inputvehiclenum"><img src={checkedImg} />Trip ID :</CFormLabel>
                                <span className="vehicle_info">{trip?.trip_id}</span> <br /></div>
                              <div class="trip-details">
                                {customerName && <CFormLabel htmlFor="inputvehiclenum"><img src={checkedImg} />Customer Name :</CFormLabel>}
                                <span className="vehicle_info">{customerName} </span><br /></div>
                              <div class="trip-details">
                                <CFormLabel htmlFor="inputvehivlemodal"><img src={checkedImg} />Trip From :</CFormLabel>

                                <span className="vehicle_info"> {trip?.trip_from?.address}</span><br /></div>
                              <div class="trip-details">
                                <CFormLabel htmlFor="inputseating"><img src={checkedImg} />Trip To :</CFormLabel>
                                <span className="vehicle_info"> {trip?.trip_to?.address}</span><br /></div>
                              <div class="trip-details">
                                <CFormLabel htmlFor="inputpassenger"><img src={checkedImg} />Date :</CFormLabel>
                                <span className="vehicle_info">{moment(trip?.pickup_date_time).format("MMM Do YYYY")}</span><br /></div>
                              <div class="trip-details">
                                <CFormLabel htmlFor="inputpassengercharges"><img src={checkedImg} />Time :</CFormLabel>
                                <span className="vehicle_info">{moment(trip?.pickup_date_time).format("h:mm a")}</span><br /></div>
                              {trip?.driver_name && <div class="trip-details">
                                <CFormLabel htmlFor="inputpassengercharges"><img src={checkedImg} />Drive Name :</CFormLabel>
                                <span className="vehicle_info">{trip?.driver_name}</span><br /></div>}
                              {(trip?.price != null) && <div class="trip-details">
                                <CFormLabel htmlFor="inputpassengercharges"><img src={checkedImg} /> Fare (in €) :</CFormLabel>
                                <span className="vehicle_info">{trip?.price}</span><br /></div>}
                              <div class="trip-details">
                                <CFormLabel htmlFor="inputpassenger"><img src={checkedImg} />Commission Type :</CFormLabel>
                                <span className="vehicle_info">{trip?.commission?.commission_type}</span><br /></div>
                              <div class="trip-details">
                                <CFormLabel htmlFor="inputpassenger"><img src={checkedImg} />Commission Value :</CFormLabel>
                                <span className="vehicle_info">{trip?.commission?.commission_value}</span><br /></div>
                              <div class="trip-details">
                                <CFormLabel htmlFor="inputpassenger"><img src={checkedImg} />Email :</CFormLabel>
                                <span className="vehicle_info">{trip?.email}</span><br /></div>
                              <div class="trip-details">
                                <CFormLabel htmlFor="inputpassenger"><img src={checkedImg} />Phone :</CFormLabel>
                                <span className="vehicle_info">{trip?.phone}</span><br /></div>

                            </CCol>





                          </form>
                        </CCardBody>
                      </CCard>
                    </CCol>
                  </CRow>
                </div>

              </div>}

            </div>
          </div>

        </div>
      </div>

    </>
  );
};

export default ViewSingleTrip; 