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
  const [pickupDate, setpickupDate] = useState(new Date()); // Initialize with the current date for tax renewal date
  const [passengers, setPassengers] = useState([]);

  const handlepickupDateChange = (date) => {
    setpickupDate(date);
  };

  const addPassenger = () => {
    setPassengers([...passengers, {}]);
  };

  const removePassenger = (index) => {
    const updatedPassengers = passengers.filter((_, i) => i !== index);
    setPassengers(updatedPassengers);
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
                <CFormLabel htmlFor="inputtripdname">Driver Name</CFormLabel>
                <CFormSelect>

                                <option >Rajesh</option>
                                <option>Ravi</option>
                                <option>Anil</option>
                                <option>Gautam</option>

                              </CFormSelect>
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="inputvehicletype">Vehicle</CFormLabel>
                <CFormSelect>

                                <option >SUV</option>
                                <option>Hatchback</option>
                                <option>Convertible</option>
                                <option>Sedan</option>

                              </CFormSelect>
              </CCol>
              <CCol xs={6}>
                <CFormLabel htmlFor="inputtripfrom">Trip From</CFormLabel>
                <CFormInput id="inputtripfrom" />
              </CCol>
              <CCol xs={6}>
                <CFormLabel htmlFor="inputtripto">Trip To</CFormLabel>
                <CFormInput id="inputtripto" />
              </CCol>
              <CCol md={3}>
                <CFormLabel htmlFor="inputpickupdate">Pickup Date and Time</CFormLabel><br/>
                <DatePicker
           selected={pickupDate}
          onChange={handlepickupDateChange }
          dateFormat="MM/dd/yyyy"
          className="form-control"
        />
              </CCol>
            </CForm>
        
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>

  {/* <CRow className="passenger-deails"> 
    
    <CCol xs={12}>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Passenger Details</strong> 
        </CCardHeader>
        <CCardBody>
        
            <CForm className="row g-3">
            <CCol md={6}>
                <CFormLabel htmlFor="inputname">Name</CFormLabel>
                <CFormInput aria-label="name" />
              </CCol>
            
              <CCol xs={6}>
                <CFormLabel htmlFor="inputphnno">Phone</CFormLabel>
                <CFormInput id="inputphnno" />
              </CCol>
              <CCol xs={6}>
                <CFormLabel htmlFor="inputtemailadd">Email Address</CFormLabel>
                <CFormInput id="inputemailadd" />
              </CCol>

              <CCol xs={6}>
                <CFormLabel htmlFor="inputaddress">Address</CFormLabel>
                <CFormInput id="inputaddress" />
              </CCol>
              <CCol xs={12}>
              <div className="d-flex justify-content-end" style={{ marginTop: "40px" }}>
                <CButton type="button" className="add_passenger_btn">+ Add Passenger</CButton>
                </div>
              </CCol>

             
            </CForm>
            <CCol xs={12}>
              <div className="d-flex justify-content-center" style={{ marginTop: "40px" }}>
                <CButton type="submit" className="submit-btn">Submit</CButton>
                <CButton type="submit" className="cancel-btn">Cancel</CButton>
                </div>
              </CCol>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow> */}

<CRow className="passenger-details">
                  {passengers.map((passenger, index) => (
                    <CCol xs={12} key={index}>
                      <CCard className="mb-4">
                        <CCardHeader>
                          <strong>Passenger Details</strong>
                          {index > 0 && (
                            <CButton
                              type="button"
                              onClick={() => removePassenger(index)}
                              className="remove_passenger_btn"
                            >
                              - Remove Passenger
                            </CButton>
                          )}
                        </CCardHeader>
                        <CCardBody>
                          <CForm className="row g-3">
                            <CCol md={6}>
                              <CFormLabel htmlFor="inputname">Name</CFormLabel>
                              <CFormInput aria-label="name" />
                            </CCol>
                            <CCol xs={6}>
                              <CFormLabel htmlFor="inputphnno">Phone</CFormLabel>
                              <CFormInput id="inputphnno" />
                            </CCol>
                            <CCol xs={6}>
                              <CFormLabel htmlFor="inputtemailadd">
                                Email Address
                              </CFormLabel>
                              <CFormInput id="inputemailadd" />
                            </CCol>
                            <CCol xs={6}>
                              <CFormLabel htmlFor="inputaddress">Address</CFormLabel>
                              <CFormInput id="inputaddress" />
                            </CCol>
                          </CForm>
                        </CCardBody>
                      </CCard>
                    </CCol>
                  ))}
                  <CCol xs={12}>
                    <div
                      className="d-flex justify-content-end"
                      style={{ marginTop: "40px" }}
                    >
                      <CButton
                        type="button"
                        onClick={addPassenger}
                        className="add_passenger_btn"
                      >
                        + Add Passenger
                      </CButton>
                    </div>
                  </CCol>    
                </CRow>
                <CCol xs={12}>
              <div className="d-flex justify-content-center" style={{ marginTop: "40px" }}>
                <CButton type="submit" className="submit-btn">Submit</CButton>
                <CButton type="submit" className="cancel-btn">Cancel</CButton>
                </div>
              </CCol>

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