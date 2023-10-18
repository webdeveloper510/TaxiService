import React,  { useState } from "react";
import AppHeader from "../../TopBar/AppHeader";
import SideBar2 from "../SideBar2"
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
import  DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

//import background from '../assets/images/heroimg.png';

const AddNewTrip=()=> {
  const [renewalDate, setRenewalDate] = useState(new Date()); // Initialize with the current date for tax renewal date
  const [insuranceDate, setInsuranceDate] = useState(new Date()); // Initialize with the current date for insurance renewal date

  const handleRenewalDateChange = (date) => {
    setRenewalDate(date);
  };


      return (
       <>
       <div className="container-fluidd">
       
        <div className="col-md-12">
       
        <div>
        <SideBar2/>

      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3" style={{ paddingBottom: "20px" }}>
        <h1 class="heading-for-every-page">Add New Trip</h1>
          <div class="active-trip-outer"> 
          {/* <h2>Add Trip Details</h2> */}
    <CRow>
    
    <CCol xs={12}>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Add Trip Details</strong> 
        </CCardHeader>
        <CCardBody>
        
            <CForm className="row g-3">
            <CCol md={6}>
                <CFormLabel htmlFor="inputvehiclenum">Vehicle No.</CFormLabel>
                <CFormInput aria-label="vehicle no." />
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="inputvehicletype">Vehicle Type</CFormLabel>
                <CFormInput aria-label="vehicle type" />
              </CCol>
              <CCol xs={6}>
                <CFormLabel htmlFor="inputvehivlemodal">Vehicle Modal</CFormLabel>
                <CFormInput id="inputvehiclemodal" />
              </CCol>
              <CCol xs={6}>
                <CFormLabel htmlFor="inputseating">Seating Capacity</CFormLabel>
                <CFormInput id="inputseating" />
              </CCol>
              <CCol md={3}>
                <CFormLabel htmlFor="inputrenewaldate">Tax Renewal Date</CFormLabel><br/>
                <DatePicker
        selected={renewalDate}
          onChange={handleRenewalDateChange }
          dateFormat="MM/dd/yyyy"
          className="form-control"
        />
          {/* <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-calendar"
      viewBox="0 0 16 16"
    >
      <path d="M3.5 0a.5.5 0 01.5.5V1h8V.5a.5.5 0 011 0V1h1a2 2 0 012 2v11a2 2 0 01-2 2H2a2 2 0 01-2-2V3a2 2 0 012-2h1V.5a.5.5 0 01.5-.5zM1 4v10a1 1 0 001 1h12a1 1 0 001-1V4H1z"></path>
    </svg> */}
     
              </CCol>
            
              
              <CCol md={6}>
                <CFormLabel htmlFor="inputmobile">Upload Vehicle Documents</CFormLabel>
                <CFormLabel htmlFor="formFile"></CFormLabel>
                <CFormInput type="file" id="formFile"/>
               
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
  
   export default AddNewTrip; 