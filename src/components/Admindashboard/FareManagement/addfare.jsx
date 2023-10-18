import React,  { useState } from "react";
import AppHeader from "../../TopBar/AppHeader";
import SideBar2 from "../SideBar2";
import { Link } from 'react-router-dom';
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
} from '@coreui/react'
import "react-datepicker/dist/react-datepicker.css";

//import background from '../assets/images/heroimg.png';

const AddFare=()=> {

      return (
       <>
       <div className="container-fluidd">
       
        <div className="col-md-12">
       
        <div>
        <SideBar2/>

      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3" style={{ paddingBottom: "20px" }}>
        <h1 class="heading-for-every-page">Fare Management</h1>
          <div class="active-trip-outer" id="fare_management_page"> 
          <div className="trips-head d-flex justify-content-between">
           <div className="box-shd d-flex justify-content-between">
           <div className="left-trip-content">
         <h2>Add Fare</h2>
         </div>
         <div className="right-trip-content">
         <Link to="/faremanagement">
         <CButton className="fare_list">Fare List</CButton>
        </Link>
           </div>
           </div>
         </div>
    <CRow>
    
    <CCol xs={12}>
      <CCard className="mb-4">
        <CCardBody>
        
            <CForm className="row g-3">
          
              <CCol md={6}>
                <CFormLabel htmlFor="inputvehicletype">Vehicle Type</CFormLabel>
                <CFormInput aria-label="vehicle type" />
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="inputvehiclefare">Vehicle Fare Per KM</CFormLabel>
                <CFormInput aria-label="vehicle fare" />
              </CCol>
              <CCol xs={6}>
                <CFormLabel htmlFor="inputvehicleminfare">Minimum Fare</CFormLabel>
                <CFormInput id="inputvehicleminfare" />
              </CCol>
              <CCol xs={6}>
                <CFormLabel htmlFor="inputmindistance">Minimum Distance</CFormLabel>
                <CFormInput id="inputmindistance" />
              </CCol>
              <CCol xs={6}>
                <CFormLabel htmlFor="inputwaitingfare">Waiting Fare</CFormLabel>
                <CFormInput id="inputwaitingfare" />
              </CCol>

           
              <CCol xs={12}>
              <div className="d-flex justify-content-center" style={{ marginTop: "40px" }}>
                <CButton type="submit" className="submit-btn">Submit</CButton>
                <CButton type="submit" className="cancel-btn">Cancel</CButton>
                </div>
              </CCol>
            </CForm>
        
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
  
   export default AddFare; 