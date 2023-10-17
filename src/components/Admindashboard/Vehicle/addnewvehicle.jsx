import React,  { useState } from "react";
import AppHeader from "../../TopBar/AppHeader";
import SideBar2 from "../SideBar2"
//import background from '../assets/images/heroimg.png';
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CForm,
    CFormInput,
    CFormLabel,
    CFormSelect,
    CRow,
  } from '@coreui/react'
  import  DatePicker from 'react-datepicker';
  import "react-datepicker/dist/react-datepicker.css";
const AddNewVehicle=()=> {

  const [vehicleinsuranceDate, setInsuranceDate] = useState(new Date()); // Initialize with the current date for insurance renewal date



  const handlevehicleInsuranceDateChange = (date) => {
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
        <h1 class="heading-for-every-page">Add New Vehicle</h1>
          <div class="active-trip-outer"> 
          <h2>Add New Vehicle</h2>
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
                <CFormSelect id="inputvehicletype">
                    <option>Choose...</option>
                    <option>...</option>
                  </CFormSelect>
              </CCol>
              <CCol xs={6}>
                <CFormLabel htmlFor="inputvehivlemodal">Vehicle Modal</CFormLabel>
                <CFormInput id="inputvehiclemodal" />
              </CCol>
              <CCol xs={6}>
                <CFormLabel htmlFor="inputseating">Seating Capacity</CFormLabel>
                <CFormInput id="inputseating" />
              </CCol>
              <CCol xs={6}>
                <CFormLabel htmlFor="inputpricekm">Price per k/m (in $) </CFormLabel>
                <CFormInput id="inputpriceprekm" />
              </CCol>
              <CCol xs={6}>
                <CFormLabel htmlFor="inputpricemin">Price per Min (in $) </CFormLabel>
                <CFormInput id="inputpricepermin" />
              </CCol>
              <CCol xs={6}>
                <CFormLabel htmlFor="inputfare">Minimum Fare (in $) </CFormLabel>
                <CFormInput id="inputforfare" />
              </CCol>
              <CCol xs={6}>
                <CFormLabel htmlFor="inputcomission">Commission (in %) </CFormLabel>
                <CFormInput id="inputcomission" />
              </CCol>
              <CCol xs={6}>
                <CFormLabel htmlFor="inputpassenger">Passenger Cancellation Time Limit (in Minute)</CFormLabel>
                <CFormInput id="inputpassengertimelimit" />
              </CCol>
              <CCol xs={6}>
                <CFormLabel htmlFor="inputpassengercharges">Passenger Cancellation Charges (in $) </CFormLabel>
                <CFormInput id="inputpassengercharges" />
              </CCol>
              
              <CCol md={6}>
                <CFormLabel htmlFor="inputinsurancedate">Insurance Renewal Date</CFormLabel><br/>
                <DatePicker
                  selected={vehicleinsuranceDate}
                  onChange={handlevehicleInsuranceDateChange}
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
  
   export default AddNewVehicle; 