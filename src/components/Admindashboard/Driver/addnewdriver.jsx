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
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import  DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

//import background from '../assets/images/heroimg.png';

const AddNewDriver=()=> {
  const [renewalDate, setRenewalDate] = useState(new Date()); // Initialize with the current date for tax renewal date
  const [insuranceDate, setInsuranceDate] = useState(new Date()); // Initialize with the current date for insurance renewal date

  const handleRenewalDateChange = (date) => {
    setRenewalDate(date);
  };

  const handleInsuranceDateChange = (date) => {
    setInsuranceDate(date);
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
        <h1 class="heading-for-every-page">Add New Driver</h1>
          <div class="active-trip-outer"> 
          <h2>Add New Driver</h2>
          <CRow>
    
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Basic Infromation</strong> 
          </CCardHeader>
          <CCardBody>
          
              <CForm className="row g-3">
              <CCol md={6}>
                  <CFormLabel htmlFor="inputfirstname">Firsr Name</CFormLabel>
                  <CFormInput aria-label="First name" />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="inputlastname">Last Name</CFormLabel>
                  <CFormInput aria-label="Last name" />
                </CCol>
                <CCol xs={6}>
                  <CFormLabel htmlFor="inputAddress">Street Address 1</CFormLabel>
                  <CFormInput id="inputAddress" />
                </CCol>
                <CCol xs={6}>
                  <CFormLabel htmlFor="inputAddress2">Street Address 2</CFormLabel>
                  <CFormInput id="inputAddress2" />
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="inputcountry">Country</CFormLabel>
                  <CFormSelect id="inputcountry">
                    <option>Choose...</option>
                    <option>...</option>
                  </CFormSelect>
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="inputCity">City</CFormLabel>
                  <CFormInput id="inputCity" />
                </CCol>
               
                <CCol md={4}>
                  <CFormLabel htmlFor="inputZip">Zip</CFormLabel>
                  <CFormInput id="inputZip" />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="inputEmail4">Email</CFormLabel>
                  <CFormInput type="email" id="inputEmail4" />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="inputmobile">Mobile No.</CFormLabel>
                  <CFormInput type="number" id="inputmobile" />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="inputgender">Gender</CFormLabel>
                  <fieldset className="row mb-12">
                  {/* <legend className="col-form-label col-sm-2 pt-0">Radios</legend> */}
                  <CCol sm={12}>
                    <CFormCheck inline
                      type="radio"
                      name="gridRadios"
                      id="gridRadios1"
                      value="option1"
                      label="Male"
                      defaultChecked
                    />
                    <CFormCheck inline
                      type="radio"
                      name="gridRadios"
                      id="gridRadios2"
                      value="option2"
                      label="Female"
                    />
                  </CCol>
                </fieldset>
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="inputmobile">Upload Profile Photo</CFormLabel>
                  <CFormLabel htmlFor="formFile"></CFormLabel>
                  <CFormInput type="file" id="formFile"/>
                 
                </CCol>

              </CForm>
          
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>

    {/********** vehicle---information---form *****************/}
    <CRow>
    
    <CCol xs={12}>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Vehicle Infromation</strong> 
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
              <CCol md={3}>
                <CFormLabel htmlFor="inputinsurancedate">Insurance Renewal Date</CFormLabel><br/>
                <DatePicker
          selected={insuranceDate}
          onChange={handleInsuranceDateChange}
          dateFormat="MM/dd/yyyy"
          className="form-control"
        />
               
                
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
  
   export default AddNewDriver; 